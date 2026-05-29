from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from code_analyzer import CodeAnalyzer
import tempfile
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CodeSubmission(BaseModel):
    code: str
    language: str


class AnalysisResult(BaseModel):
    language: str
    loops: dict
    recursion: dict
    time_complexity: dict
    space_complexity: dict
    optimizations: list
    compiler_recommendations: dict


@app.get("/")
def home():
    return {"message": "Compiler Optimization Advisor Backend Running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/analyze")
async def analyze_code(submission: CodeSubmission):
    """Analyze code for optimization opportunities"""
    if not submission.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty")
    
    try:
        analyzer = CodeAnalyzer(submission.code, submission.language)
        result = analyzer.analyze()
        
        # Calculate performance score
        performance_score = calculate_performance_score(result)
        result['performance_score'] = performance_score
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload and analyze a source code file"""
    try:
        content = await file.read()
        code = content.decode('utf-8')
        
        # Detect language from file extension
        ext = os.path.splitext(file.filename)[1].lower()
        language_map = {
            '.py': 'python',
            '.java': 'java',
            '.cpp': 'cpp',
            '.cc': 'cpp',
            '.cxx': 'cpp',
            '.c': 'c',
            '.h': 'c',
        }
        language = language_map.get(ext, 'unknown')
        
        analyzer = CodeAnalyzer(code, language)
        result = analyzer.analyze()
        
        # Calculate performance score
        performance_score = calculate_performance_score(result)
        result['performance_score'] = performance_score
        result['filename'] = file.filename
        
        return result
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="File must be valid UTF-8 text")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@app.get("/languages")
def get_supported_languages():
    """Get list of supported programming languages"""
    return {
        "supported": ["C", "C++", "Java", "Python"],
        "extensions": {
            "python": [".py"],
            "java": [".java"],
            "cpp": [".cpp", ".cc", ".cxx", ".h"],
            "c": [".c", ".h"]
        }
    }


@app.get("/docs-optimization")
def get_optimization_guide():
    """Get guide for compiler optimizations"""
    return {
        "common_optimizations": [
            {
                "name": "Loop Unrolling",
                "description": "Reduces branch prediction misses",
                "compiler_flags": ["-funroll-loops", "-O3"]
            },
            {
                "name": "Loop Tiling",
                "description": "Improves cache locality",
                "compiler_flags": ["-O3", "-march=native"]
            },
            {
                "name": "Tail Call Optimization",
                "description": "Converts tail recursion to loop",
                "compiler_flags": ["-O2", "-O3"]
            },
            {
                "name": "Memoization",
                "description": "Caches recursive results",
                "implementation": "Manual code modification"
            },
            {
                "name": "SIMD Vectorization",
                "description": "Processes multiple data in parallel",
                "compiler_flags": ["-O3", "-march=native", "-ftree-vectorize"]
            }
        ]
    }


def calculate_performance_score(analysis_result: dict) -> int:
    """Calculate a performance score based on analysis"""
    score = 100
    
    # Penalize for nested loops
    nesting = analysis_result.get('loops', {}).get('max_nesting_depth', 0)
    score -= min(nesting * 10, 30)
    
    # Penalize for non-tail recursion
    if analysis_result.get('recursion', {}).get('has_recursion'):
        if not analysis_result['recursion']['tail_recursive']:
            score -= 15
    
    # Penalize for high complexity
    time_complexity = analysis_result.get('time_complexity', {}).get('estimated_complexity', 'O(1)')
    if 'n²' in time_complexity or 'n³' in time_complexity:
        score -= 20
    if 'n³' in time_complexity or '2ⁿ' in time_complexity:
        score -= 10
    
    # Award points for simple complexity
    if time_complexity == 'O(1)':
        score += 5
    elif time_complexity == 'O(log n)':
        score += 3
    
    return max(0, min(score, 100))