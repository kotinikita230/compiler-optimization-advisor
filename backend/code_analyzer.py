import re
from typing import Dict, List, Tuple, Any


class CodeAnalyzer:
    def __init__(self, code: str, language: str):
        self.code = code
        self.language = language.lower()
        self.lines = code.split('\n')
        
    def detect_language(self) -> str:
        """Auto-detect programming language from code patterns"""
        code_lower = self.code.lower()
        
        # Java indicators
        if 'class ' in code_lower and ('public ' in code_lower or 'private ' in code_lower or 'static void main' in code_lower):
            return 'java'
        
        # C/C++ indicators
        if '#include <' in code_lower or '#include "' in code_lower:
            if 'iostream' in code_lower or 'vector' in code_lower or 'string' in code_lower:
                return 'cpp'
            return 'c'
            
        if 'int main' in code_lower or 'void main' in code_lower:
            if 'cout' in code_lower or 'cin' in code_lower or 'std::' in code_lower:
                return 'cpp'
            return 'c'
            
        # If it has standard C data types and semicolons but no def
        if (';' in code_lower and '{' in code_lower) and ('int ' in code_lower or 'char ' in code_lower or 'void ' in code_lower) and 'def ' not in code_lower:
            if 'cout' in code_lower or 'std::' in code_lower or 'public:' in code_lower:
                return 'cpp'
            return 'c'
        
        # Python indicators
        if 'def ' in code_lower and ':' in code_lower:
            return 'python'
        if 'import ' in code_lower and ';' not in code_lower:
            return 'python'
        if 'print(' in code_lower and ';' not in code_lower:
            return 'python'
        
        # Default based on file or explicitly set
        if self.language and self.language != 'auto':
            return self.language
        return 'python'
    
    def detect_loops(self) -> Dict[str, Any]:
        """Detect loops and nested loops"""
        loops = []
        nested_levels = {}
        max_nesting = 0
        current_nesting = 0
        
        for i, line in enumerate(self.lines, 1):
            line_stripped = line.strip()
            
            # Detect for loops
            if re.search(r'\b(for|while)\b\s*\(', line_stripped):
                current_nesting += 1
                max_nesting = max(max_nesting, current_nesting)
                loop_match = re.search(r'(for|while)\s*\(([^)]*)\)', line_stripped)
                if loop_match:
                    loop_type = loop_match.group(1)
                    loop_var = loop_match.group(2)
                    loops.append({
                        'type': loop_type,
                        'line': i,
                        'code': line_stripped,
                        'nesting_level': current_nesting,
                        'condition': loop_var[:50]
                    })
            
            # Detect closing braces to decrease nesting
            if re.search(r'[\}]', line_stripped):
                if line_stripped.startswith('}'):
                    current_nesting = max(0, current_nesting - 1)
        
        return {
            'loops_found': len(loops),
            'max_nesting_depth': max_nesting,
            'loops': loops
        }
    
    def detect_recursion(self) -> Dict[str, Any]:
        """Detect recursive function calls"""
        recursion_info = {
            'recursive_functions': [],
            'tail_recursive': [],
            'has_recursion': False
        }
        
        # Simple pattern matching for function definitions
        function_patterns = {
            'python': r'def\s+(\w+)\s*\(',
            'java': r'(?:public|private|protected|static)\s+\w+\s+(\w+)\s*\(',
            'cpp': r'(?:\w+\s+)+(\w+)\s*\([^)]*\)\s*\{',
            'c': r'(?:\w+\s+)+(\w+)\s*\([^)]*\)\s*\{'
        }
        
        pattern = function_patterns.get(self.language, r'(?:def|function)\s+(\w+)')
        
        functions = re.findall(pattern, self.code)
        
        for func in functions:
            # Check if function calls itself
            call_pattern = r'\b' + func + r'\s*\('
            if re.search(call_pattern, self.code):
                recursion_info['recursive_functions'].append({
                    'name': func,
                    'type': 'recursive'
                })
                recursion_info['has_recursion'] = True
                
                # Check for tail recursion
                if self._is_tail_recursive(func):
                    recursion_info['tail_recursive'].append(func)
        
        return recursion_info
    
    def _is_tail_recursive(self, func_name: str) -> bool:
        """Check if a function appears to be tail recursive"""
        # Simple heuristic: if the recursive call is the last statement
        func_body_match = re.search(
            r'(?:def|function|void)\s+' + func_name + r'\s*\([^)]*\)\s*\{?(.+?)(?:\}|$)',
            self.code,
            re.DOTALL
        )
        if func_body_match:
            body = func_body_match.group(1)
            lines = body.strip().split('\n')
            if lines:
                last_line = lines[-1].strip()
                if re.search(r'\b' + func_name + r'\s*\(', last_line):
                    return True
        return False
    
    def estimate_time_complexity(self) -> Dict[str, Any]:
        """Estimate time complexity"""
        loop_info = self.detect_loops()
        recursion_info = self.detect_recursion()
        
        max_nesting = loop_info['max_nesting_depth']
        has_recursion = recursion_info['has_recursion']
        
        complexity_map = {
            0: 'O(1)',
            1: 'O(n)',
            2: 'O(n²)',
            3: 'O(n³)',
            4: 'O(n⁴)',
        }
        
        # Check for more complex patterns
        if 'log' in self.code.lower() and 'break' in self.code.lower():
            complexity = 'O(n log n)'
        elif 'sqrt' in self.code.lower():
            complexity = 'O(√n)'
        elif max_nesting in complexity_map:
            complexity = complexity_map[max_nesting]
        else:
            complexity = f'O(n^{max_nesting})'
        
        if has_recursion and not recursion_info['tail_recursive']:
            # Exponential recursion
            if 'fib' in self.code.lower():
                complexity = 'O(2ⁿ)'
        
        return {
            'estimated_complexity': complexity,
            'loops': loop_info['max_nesting_depth'],
            'has_recursion': has_recursion,
            'basis': 'Loop nesting and recursion analysis'
        }
    
    def estimate_space_complexity(self) -> Dict[str, Any]:
        """Estimate space complexity"""
        recursion_info = self.detect_recursion()
        
        space_complexity = 'O(1)'
        factors = []
        
        # Check for array/list declarations
        if any(pattern in self.code for pattern in ['new ', '[]', 'malloc', 'vector', 'new Array']):
            space_complexity = 'O(n)'
            factors.append('Dynamic array allocation')
        
        # Check for recursion depth
        if recursion_info['has_recursion']:
            if recursion_info['tail_recursive']:
                factors.append('Tail recursive (stack optimizable)')
            else:
                space_complexity = 'O(n)'
                factors.append('Recursive call stack')
        
        # Check for nested data structures
        nesting_count = self.code.count('[[') + self.code.count('{{')
        if nesting_count > 0:
            space_complexity = 'O(n²)' if nesting_count > 1 else 'O(n)'
            factors.append(f'Nested data structures ({nesting_count})')
        
        return {
            'estimated_complexity': space_complexity,
            'factors': factors
        }
    
    def suggest_optimizations(self) -> List[Dict[str, str]]:
        """Suggest compiler optimizations"""
        optimizations = []
        
        loop_info = self.detect_loops()
        recursion_info = self.detect_recursion()
        
        # Loop optimizations
        if loop_info['loops_found'] > 0:
            optimizations.append({
                'category': 'Loop Optimization',
                'suggestion': 'Use loop unrolling to reduce branch prediction misses',
                'impact': 'Medium',
                'priority': 'High'
            })
            
            if loop_info['max_nesting_depth'] >= 2:
                optimizations.append({
                    'category': 'Loop Optimization',
                    'suggestion': 'Apply loop tiling to improve cache locality for nested loops',
                    'impact': 'High',
                    'priority': 'High'
                })
                optimizations.append({
                    'category': 'Loop Optimization',
                    'suggestion': 'Consider loop fusion to reduce memory bandwidth',
                    'impact': 'Medium',
                    'priority': 'Medium'
                })
        
        # Recursion optimizations
        if recursion_info['has_recursion']:
            if recursion_info['tail_recursive']:
                optimizations.append({
                    'category': 'Recursion Optimization',
                    'suggestion': 'Enable tail call optimization (TCO) - compiler will convert to loop',
                    'impact': 'High',
                    'priority': 'High'
                })
            else:
                optimizations.append({
                    'category': 'Recursion Optimization',
                    'suggestion': 'Consider converting to iterative approach to reduce stack usage',
                    'impact': 'High',
                    'priority': 'High'
                })
                optimizations.append({
                    'category': 'Recursion Optimization',
                    'suggestion': 'Implement memoization to cache recursive results',
                    'impact': 'Very High',
                    'priority': 'High'
                })
        
        # General optimizations
        optimizations.append({
            'category': 'Compiler Flags',
            'suggestion': 'Use -O3 optimization flag for aggressive optimizations',
            'impact': 'Medium',
            'priority': 'High',
            'code': '-O3'
        })
        
        optimizations.append({
            'category': 'Algorithm',
            'suggestion': 'Review algorithm choice - consider alternative algorithms with better complexity',
            'impact': 'Very High',
            'priority': 'High'
        })
        
        if 'printf' in self.code or 'cout' in self.code:
            optimizations.append({
                'category': 'I/O Optimization',
                'suggestion': 'Use fast I/O techniques (e.g., ios_base::sync_with_stdio(false))',
                'impact': 'Medium',
                'priority': 'Medium'
            })
        
        return optimizations
    
    def recommend_compilers(self) -> Dict[str, Any]:
        """Recommend compilers and flags based on code characteristics"""
        language = self.language
        loop_info = self.detect_loops()
        recursion_info = self.detect_recursion()
        space_comp = self.estimate_space_complexity()

        has_heavy_loops = loop_info['max_nesting_depth'] >= 2
        has_recursion = recursion_info['has_recursion']
        
        compilers = []
        
        if language == 'python':
            compilers = [
                {
                    "name": "CPython",
                    "score": 60 if has_heavy_loops else 85,
                    "expected_performance": "Standard",
                    "reason": "Default reference implementation. Good for general scripts.",
                    "flags": "N/A"
                },
                {
                    "name": "PyPy",
                    "score": 95 if has_heavy_loops else 80,
                    "expected_performance": "High (JIT)",
                    "reason": "JIT compilation provides massive speedups for CPU-bound code and loops.",
                    "flags": "N/A"
                }
            ]
        elif language in ['c', 'cpp']:
            gcc_flags = "-O3 -march=native" if has_heavy_loops else "-O2 -march=native"
            clang_flags = "-O3 -march=native" if has_heavy_loops else "-O2"
            msvc_flags = "/O2 /fp:fast" if has_heavy_loops else "/O2"
            
            if has_heavy_loops:
                gcc_flags += " -funroll-loops"
                clang_flags += " -fvectorize"
            
            compilers = [
                {
                    "name": "GCC",
                    "score": 90,
                    "expected_performance": "High",
                    "reason": "Mature, highly optimizing compiler with excellent loop optimization.",
                    "flags": gcc_flags
                },
                {
                    "name": "Clang",
                    "score": 92,
                    "expected_performance": "High",
                    "reason": "Modern LLVM backend, fast compilation, excellent diagnostics.",
                    "flags": clang_flags
                },
                {
                    "name": "MSVC",
                    "score": 85,
                    "expected_performance": "High",
                    "reason": "Standard on Windows, deep integration with OS.",
                    "flags": msvc_flags
                }
            ]
            
            if 'O(n²)' in space_comp['estimated_complexity'] or 'O(n)' in space_comp['estimated_complexity']:
                for c in compilers:
                    if c['name'] in ['GCC', 'Clang']:
                        c['reason'] += ' Consider -Os for memory footprint.'
        elif language == 'java':
            compilers = [
                {
                    "name": "OpenJDK HotSpot JVM",
                    "score": 90,
                    "expected_performance": "High",
                    "reason": "Standard JVM with excellent C2 JIT compiler.",
                    "flags": "-server -XX:+UseG1GC"
                },
                {
                    "name": "GraalVM",
                    "score": 95 if has_heavy_loops else 85,
                    "expected_performance": "Very High",
                    "reason": "Advanced JIT compiler, excellent for complex abstractions and loops.",
                    "flags": "-XX:+UnlockExperimentalVMOptions -XX:+UseJVMCICompiler"
                }
            ]
        else:
            compilers = [
                {
                    "name": "Default Compiler/Interpreter",
                    "score": 80,
                    "expected_performance": "Standard",
                    "reason": "Standard execution environment for the language.",
                    "flags": "Default"
                }
            ]

        compilers.sort(key=lambda x: x['score'], reverse=True)
        best_compiler = compilers[0] if compilers else None

        return {
            "comparison": compilers,
            "best_compiler": best_compiler
        }

    def analyze(self) -> Dict[str, Any]:
        """Complete analysis of the code"""
        detected_language = self.detect_language()
        self.language = detected_language
        
        return {
            'language': detected_language,
            'loops': self.detect_loops(),
            'recursion': self.detect_recursion(),
            'time_complexity': self.estimate_time_complexity(),
            'space_complexity': self.estimate_space_complexity(),
            'optimizations': self.suggest_optimizations(),
            'compiler_recommendations': self.recommend_compilers()
        }
