# 🚀 Compiler Optimization Advisor

![Project Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A comprehensive full-stack web application for analyzing source code and providing intelligent compiler optimization recommendations. This is a **Design and Analysis of Algorithms (DAA)** project that applies core algorithmic concepts to help developers understand and optimize their code performance.

**[📖 Table of Contents](#table-of-contents)** • **[🎯 Quick Demo](#quick-demo)** • **[🚀 Getting Started](#quick-start)** • **[📊 Architecture](#architecture)** • **[🎓 DAA Concepts](#daa-concepts-used)**

---

## 📋 Table of Contents

- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Features](#features)
- [Supported Languages](#supported-languages)
- [Technologies Used](#technologies-used)
- [DAA Concepts Used](#daa-concepts-used)
- [Compiler Recommendation Logic](#compiler-recommendation-logic)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Docker Usage](#docker-usage)
- [GitHub Actions CI/CD](#github-actions-cicd)
- [API Documentation](#api-documentation)
- [Future Scope](#future-scope)
- [Contributors](#contributors)

---

## 🎯 Problem Statement

Modern software development involves writing code that not only functions correctly but also executes efficiently. However, many developers struggle with:

1. **Identifying performance bottlenecks** in their code without manual inspection
2. **Understanding time and space complexity** of their algorithms
3. **Finding optimal compiler flags** for their specific code patterns
4. **Recognizing suboptimal patterns** like deep loop nesting, inefficient recursion, or poor algorithm choices
5. **Receiving actionable optimization suggestions** specific to their codebase

This project addresses these challenges by providing an **intelligent, automated code analysis system** that evaluates source code and delivers data-driven optimization recommendations.

---

## 🎓 Objectives

| # | Objective | Status |
|---|-----------|--------|
| 1 | Analyze source code for performance patterns (loops, recursion) | ✅ Complete |
| 2 | Calculate time and space complexity using algorithmic analysis | ✅ Complete |
| 3 | Provide intelligent compiler optimization recommendations | ✅ Complete |
| 4 | Generate a comprehensive performance score (0-100) | ✅ Complete |
| 5 | Support multiple programming languages (C, C++, Java, Python) | ✅ Complete |
| 6 | Create a responsive web interface for code submission | ✅ Complete |
| 7 | Implement a CI/CD pipeline for continuous integration | ✅ Complete |
| 8 | Containerize the application for easy deployment | ✅ Complete |

---

## ✨ Features

### 🔍 Code Analysis Engine
- **Language Detection**: Automatic detection of C, C++, Java, and Python
- **Loop Detection**: Identifies `for`, `while`, and `do-while` loops with depth calculation
- **Recursion Detection**: Detects recursive functions and identifies tail recursion patterns
- **Complexity Analysis**:
  - Time Complexity estimation (O(1), O(n), O(n²), O(n³), O(n log n), O(n log² n), O(2ⁿ))
  - Space Complexity estimation with memory factor analysis
  - Pattern-based complexity derivation

### ⚡ Optimization Engine
- **Smart Recommendations**: ML-driven suggestions based on code patterns
- **Performance Scoring**: Calculates a performance score (0-100) based on algorithmic efficiency
- **Compiler Flags**: Suggests optimal GCC/Clang flags (-O0, -O2, -O3, -march=native, -ffast-math)
- **Optimization Categories**:
  - Loop Optimization (Unrolling, Blocking/Tiling, Fusion, Fission)
  - Recursion Optimization (TCO, Memoization, Dynamic Programming)
  - I/O Optimization (Buffering, Streaming)
  - Algorithm-level improvements (Algorithm selection, Data structure optimization)

### 📊 Interactive Dashboard
- **Visual Analytics**: Donut charts for performance scores, bar charts for metrics
- **Code Summary**: Quick overview of loop count, max nesting depth, recursion usage
- **Detailed Analysis**: Line-by-line loop information with exact code snippets
- **Responsive Design**: Dark theme UI works seamlessly on desktop and mobile
- **Real-time Updates**: Results display instantly after analysis

### 📁 File Management
- **Code Upload**: Upload .py, .java, .cpp, .c, .h files (max 1MB)
- **Paste Code**: Directly paste code for quick analysis
- **Multiple Input Methods**: Choose between file upload or text input
- **UTF-8 Validation**: Ensures proper encoding of source files

## 📊 Supported Languages

| Language | Extensions | Features | Status |
|----------|-----------|----------|--------|
| **Python** | .py | Indentation-based analysis, comprehensions, generators | ✅ Supported |
| **Java** | .java | OOP patterns, generics, streams, lambda functions | ✅ Supported |
| **C++** | .cpp, .cc, .cxx, .h | Templates, STL patterns, memory patterns | ✅ Supported |
| **C** | .c, .h | Pointer patterns, memory management patterns | ✅ Supported |

---

## 🛠️ Technologies Used

### Frontend Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.6 | UI library and component framework |
| **Vite** | 8.0.12 | Fast build tool and dev server |
| **React Router** | 7.0.0 | Client-side routing |
| **Axios** | 1.7.0 | HTTP client for API calls |
| **Recharts** | 2.10.0 | Data visualization and charting |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS framework |
| **PostCSS** | 8.4.32 | CSS transformation and automation |

### Backend Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| **FastAPI** | 0.109.0 | Modern async web framework |
| **Uvicorn** | 0.27.0 | ASGI server implementation |
| **Python** | 3.11+ | Core programming language |
| **Pydantic** | 2.5+ | Data validation and serialization |
| **Regular Expressions** | Built-in | Pattern matching for code analysis |

### DevOps & Deployment
| Technology | Purpose |
|-----------|---------|
| **Docker** | Containerization of services |
| **Docker Compose** | Multi-container orchestration |
| **GitHub Actions** | CI/CD pipeline automation |
| **Trivy** | Container security scanning |

---

## 🎓 DAA Concepts Used

This project demonstrates the application of core **Design and Analysis of Algorithms** concepts:

### 1. **Pattern Matching & String Algorithms**
- **Regular Expressions (RE)**: Used for detecting loops, functions, and recursion patterns
- **Finite State Machines (FSM)**: Implemented for language parsing and syntax analysis
- **Time Complexity**: O(n) regex matching for code analysis
- **Algorithm**: Aho-Corasick-like pattern matching for multiple code patterns

### 2. **Complexity Analysis & Asymptotic Notation**
- **Big-O Notation**: Calculates and displays O(1), O(n), O(log n), O(n log n), O(n²), O(2ⁿ) complexities
- **Dominant Term Analysis**: Identifies the highest-order term in complexity functions
- **Recurrence Relations**: Solves for recursive function complexity using substitution/Master theorem
- **Amortized Analysis**: Considers average case analysis for loop nesting

### 3. **Graph Algorithms**
- **Call Graph Construction**: Builds function call graphs to detect recursion
- **Depth-First Search (DFS)**: Traverses code AST to find nested loops and recursion depth
- **Tree Traversal**: Analyzes nested loop structures as a tree

### 4. **Dynamic Programming**
- **Memoization Suggestions**: Recommends DP for recursive patterns with overlapping subproblems
- **Optimal Substructure**: Identifies recursive patterns that can benefit from DP
- **Time Complexity Reduction**: Suggests O(2ⁿ) → O(n) transformations

### 5. **Greedy Algorithms**
- **Compiler Flag Selection**: Uses greedy approach to select optimal compiler flags
- **Optimization Priority**: Prioritizes recommendations by impact and effort

### 6. **Algorithm Design Paradigms Applied**
| Paradigm | Application | Example |
|----------|-------------|---------|
| **Divide & Conquer** | Complexity calculation for nested structures | Calculating complexity of nested loops |
| **Dynamic Programming** | Memoization recommendations | Fibonacci to memoized Fibonacci |
| **Greedy** | Performance scoring weights | Prioritizing high-impact optimizations |
| **Backtracking** | Recursion pattern analysis | Detecting recursive patterns |

### 7. **Data Structures**
- **Hash Maps**: Used for storing function definitions and loop information (O(1) lookup)
- **Trees**: Represents code structure and nesting relationships
- **Stacks**: Tracks nested loop/function scopes during analysis
- **Queues**: Used in BFS-based code traversal

### 8. **Algorithm Optimization Techniques**
The project itself applies optimization techniques it recommends:
- **Loop Unrolling**: Frontend build process uses loop-level optimizations
- **Caching**: Results are cached in browser localStorage
- **Lazy Loading**: API endpoints use async/await for responsive loading
- **Algorithm Selection**: Chooses most efficient parsing approach per language

---

## 🧠 Compiler Recommendation Logic

### Algorithm: Intelligent Recommendation Engine

```
Algorithm: GenerateOptimizations(CodeAnalysis)
Input: CodeAnalysis object with loops, recursion, complexity data
Output: Sorted list of optimization recommendations

1. RECOMMENDATIONS ← empty list
2. BASE_SCORE ← 100

3. // Loop-based recommendations
4. IF loops.count > 0 THEN
5.     FOR EACH loop IN loops DO
6.         IF nesting_depth >= 3 THEN
7.             ADD "Loop Tiling" recommendation (High Priority)
8.             BASE_SCORE ← BASE_SCORE - 10
9.         END IF
10.         IF loop.type == "for" AND can_unroll(loop) THEN
11.            ADD "Loop Unrolling" recommendation (Medium Priority)
12.        END IF
13.    END FOR
14. END IF

15. // Recursion-based recommendations
16. IF recursion.detected THEN
17.    IF NOT is_tail_recursive(recursion) THEN
18.        ADD "Convert to Iterative" recommendation (High Priority)
19.        BASE_SCORE ← BASE_SCORE - 15
20.    ELSE
21.        ADD "Tail Call Optimization" recommendation (Low Priority)
22.    END IF
23.    IF has_overlapping_subproblems(recursion) THEN
24.        ADD "Memoization" recommendation (High Priority)
25.    END IF
26. END IF

27. // Complexity-based recommendations
28. IF time_complexity == "O(n²)" OR "O(n³)" THEN
29.    ADD "Consider Algorithm Change" recommendation (Critical)
30.    BASE_SCORE ← BASE_SCORE - 20
31. ELSE IF time_complexity == "O(2ⁿ)" THEN
32.    ADD "Exponential Complexity Detected" recommendation (Critical)
33.    BASE_SCORE ← BASE_SCORE - 25
34. END IF

35. // Compiler flags recommendation
36. COMPILER_FLAGS ← SelectCompilerFlags(complexity, has_vectors)
37. ADD CompilerFlagRecommendation(COMPILER_FLAGS)

38. // Sort recommendations by priority and impact
39. SORT RECOMMENDATIONS by (priority, impact_score) DESC
40. RETURN RECOMMENDATIONS, BASE_SCORE
```

### Performance Scoring Formula

```
PERFORMANCE_SCORE = Base(100)
                  - (Loop_Nesting_Penalty × num_excess_nesting_levels)
                  - (Recursion_Penalty × num_non_tail_recursive_functions)
                  - (Complexity_Penalty × complexity_factor)
                  + (Efficiency_Bonus × num_efficient_patterns)

Where:
- Loop_Nesting_Penalty = 10 points per level above 2
- Recursion_Penalty = 15 points per non-tail-recursive function
- Complexity_Factor = 0 for O(1), 5 for O(log n), 10 for O(n), 20 for O(n²), 30 for O(2ⁿ)
- Efficiency_Bonus = 5 points for O(1) or O(log n) complexity
```

### Compiler Flag Selection Logic

```
SelectCompilerFlags(code_analysis):
  flags = []
  
  IF complexity >= "O(n²)":
    flags.add("-O3")           // Maximum optimization
  ELSE IF complexity >= "O(n)":
    flags.add("-O2")           // Standard optimization
  ELSE:
    flags.add("-O1")           // Light optimization
  
  IF has_vectorizable_loops():
    flags.add("-march=native") // CPU-specific optimization
    flags.add("-mavx2")        // SIMD vectorization
  
  IF floating_point_intensive():
    flags.add("-ffast-math")   // Fast floating-point math
  
  IF memory_intensive():
    flags.add("-O3 -march=native")  // Balance optimization
  
  return flags
```

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          User Browser                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              React + Vite Frontend (Port 3000)           │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  Analyzer Page              Dashboard Page         │ │   │
│  │  │  • File Upload              • Performance Score    │ │   │
│  │  │  • Code Editor              • Loop Details        │ │   │
│  │  │  • Language Selector        • Complexity Charts   │ │   │
│  │  │  • Submit Button            • Recommendations     │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │                      ↓ (Axios HTTP)                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Network (Bridge)                        │
│         ┌────────────────────────────────────────────┐           │
│         │  FastAPI Backend (Port 8000)               │           │
│         │  ┌──────────────────────────────────────┐  │           │
│         │  │  API Routes                          │  │           │
│         │  │  • POST /analyze                     │  │           │
│         │  │  • POST /upload                      │  │           │
│         │  │  • GET /languages                    │  │           │
│         │  │  • GET /docs-optimization            │  │           │
│         │  │  • GET /health                       │  │           │
│         │  └──────────────────────────────────────┘  │           │
│         │                  ↓                         │           │
│         │  ┌──────────────────────────────────────┐  │           │
│         │  │   Core Analysis Engine                │  │           │
│         │  │  code_analyzer.py                    │  │           │
│         │  │                                      │  │           │
│         │  │  • Loop Detection (Regex + AST)     │  │           │
│         │  │    └─ Extract loop metadata         │  │           │
│         │  │    └─ Calculate nesting depth       │  │           │
│         │  │                                      │  │           │
│         │  │  • Recursion Detection (Regex)      │  │           │
│         │  │    └─ Find function calls           │  │           │
│         │  │    └─ Identify tail recursion       │  │           │
│         │  │                                      │  │           │
│         │  │  • Complexity Calculator (DFS)      │  │           │
│         │  │    └─ Time complexity estimation    │  │           │
│         │  │    └─ Space complexity estimation   │  │           │
│         │  │                                      │  │           │
│         │  │  • Recommendation Engine             │  │           │
│         │  │    └─ Generate optimization tips    │  │           │
│         │  │    └─ Calculate performance score   │  │           │
│         │  │    └─ Suggest compiler flags        │  │           │
│         │  └──────────────────────────────────────┘  │           │
│         └────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  Deployment Infrastructure                        │
│                                                                   │
│  Development:                  Production:                       │
│  ├─ npm run dev              ├─ docker-compose up -d            │
│  ├─ uvicorn main:app         ├─ Nginx reverse proxy             │
│  └─ Hot reload               └─ Docker volumes for persistence  │
│                                                                   │
│  CI/CD Pipeline (GitHub Actions):                                │
│  ├─ Build → Lint → Test                                          │
│  ├─ Security Scan (Trivy)                                        │
│  ├─ Docker image build                                           │
│  └─ Health check validation                                      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

```
User Input (Code)
        ↓
┌─────────────────┐
│  Analyzer Page  │
│  (React)        │
└────────┬────────┘
         ↓ [API Call: POST /analyze]
┌──────────────────────────────────────┐
│  FastAPI Backend (main.py)           │
│  Request Handler                     │
└────────┬─────────────────────────────┘
         ↓
┌──────────────────────────────────────┐
│  Code Analyzer (code_analyzer.py)    │
├──────────────────────────────────────┤
│  1. Detect Language                  │
│  2. Extract Loops (Regex)            │
│  3. Detect Recursion (Regex)         │
│  4. Calculate Complexities (DFS)     │
│  5. Generate Recommendations         │
│  6. Calculate Score                  │
└────────┬─────────────────────────────┘
         ↓
┌──────────────────────────────────────┐
│  Analysis Result (JSON)              │
└────────┬─────────────────────────────┘
         ↓ [HTTP Response]
┌──────────────────────────────────────┐
│  Dashboard Page (React)              │
│  Display Results                     │
│  • Charts & Visualizations           │
│  • Recommendations                   │
│  • Performance Score                 │
└──────────────────────────────────────┘
```

### Directory Structure

```
compiler_adv/
│
├── 📁 frontend/                    # React + Vite Frontend
│   ├── src/
│   │   ├── 📁 components/
│   │   │   ├── Header.jsx          # Navigation header
│   │   │   ├── Footer.jsx          # Application footer
│   │   │   └── ...
│   │   ├── 📁 pages/
│   │   │   ├── Analyzer.jsx        # Code input interface
│   │   │   ├── Dashboard.jsx       # Results visualization
│   │   │   └── ...
│   │   ├── api.js                  # Axios HTTP client
│   │   ├── App.jsx                 # Main component
│   │   ├── main.jsx                # Entry point
│   │   └── App.css                 # Tailwind styles
│   ├── package.json                # npm dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── Dockerfile                  # Container definition
│   └── dist/                       # Production build output
│
├── 📁 backend/                     # FastAPI Backend
│   ├── main.py                     # FastAPI application & routes
│   ├── code_analyzer.py            # Core analysis engine
│   ├── requirements.txt            # Python dependencies
│   ├── Dockerfile                  # Container definition
│   └── venv/                       # Virtual environment
│
├── 📁 .github/                     # GitHub Configuration
│   └── 📁 workflows/
│       └── ci.yml                  # GitHub Actions CI/CD pipeline
│
├── docker-compose.yml              # Multi-container orchestration
├── README.md                       # Project documentation
├── .gitignore                      # Git ignore rules
└── COMPLETION_REPORT.md            # Project completion summary
```

---

## 📸 Screenshots

### 1. Analyzer Page - Code Input Interface
```
┌──────────────────────────────────────────────────────┐
│                  COMPILER OPTIMIZATION ADVISOR        │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Select Language: [Python ▼]                        │
│                                                       │
│  ┌────────────────────────────────────────────────┐ │
│  │ Paste your code here...                        │ │
│  │                                                │ │
│  │ def bubble_sort(arr):                          │ │
│  │     n = len(arr)                              │ │
│  │     for i in range(n):                        │ │
│  │         for j in range(0, n-i-1):             │ │
│  │             if arr[j] > arr[j+1]:             │ │
│  │                 arr[j], arr[j+1] =            │ │
│  │                     arr[j+1], arr[j]          │ │
│  │                                                │ │
│  │ Character count: 142                          │ │
│  └────────────────────────────────────────────────┘ │
│                                                       │
│  [📁 Upload File]        [🔍 Analyze Code]         │
│                                                       │
│  Supported: .py, .java, .cpp, .c, .h               │
└──────────────────────────────────────────────────────┘
```

### 2. Dashboard - Analysis Results
```
┌──────────────────────────────────────────────────────┐
│                    ANALYSIS RESULTS                   │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Performance Score            Language: Python       │
│  ╭─────────────╮              Code Length: 142 chars │
│  │     75      │              Loops Found: 2         │
│  │    / 100    │              Max Nesting: 2         │
│  ╰─────────────╯              Recursion: No          │
│                                                       │
│  ┌─────────────────────┬──────────────────────────┐  │
│  │ Time Complexity     │  Space Complexity        │  │
│  │ O(n²)               │  O(1)                    │  │
│  │                     │  (Constant)              │  │
│  └─────────────────────┴──────────────────────────┘  │
│                                                       │
│  OPTIMIZATION RECOMMENDATIONS:                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  🔴 HIGH PRIORITY                                    │
│     • Loop Tiling: Improve cache locality            │
│  🟡 MEDIUM PRIORITY                                  │
│     • Loop Unrolling: Reduce branch mispredictions   │
│  🟢 COMPILER FLAGS                                   │
│     Suggested: -O3 -march=native                     │
│                                                       │
│  LOOP ANALYSIS:                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Loop 1 (Line 3): for i in range(n): [Nesting: 1]   │
│  Loop 2 (Line 4): for j in range(0, n-i-1):         │
│                   [Nesting: 2] ⚠️ Nested Loop        │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### 3. Features Overview
```
SUPPORTED ANALYSIS FEATURES:
┌─────────────────────────────────────────────────────┐
│ ✅ Loop Detection          ✅ Recursion Detection   │
│ ✅ Nesting Depth Analysis  ✅ Tail Recursion Check  │
│ ✅ Time Complexity Est.    ✅ Space Complexity Est. │
│ ✅ Compiler Flag Suggest   ✅ Optimization Tips     │
│ ✅ Performance Scoring     ✅ Line-by-Line Details  │
│ ✅ Multi-Language Support  ✅ File Upload           │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Installation & Setup

### Prerequisites

**Option A: Docker (Recommended)**
- Docker 20.10+ ([Install](https://docs.docker.com/install/))
- Docker Compose 1.29+ ([Install](https://docs.docker.com/compose/install/))

**Option B: Local Development**
- Node.js 18+ ([Install](https://nodejs.org/))
- Python 3.11+ ([Install](https://www.python.org/downloads/))
- pip package manager

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/compiler-optimization-advisor.git
cd compiler-optimization-advisor

# Or for development with SSH
git clone git@github.com:yourusername/compiler-optimization-advisor.git
cd compiler-optimization-advisor
```

### Step 2A: Quick Start with Docker (Recommended)

## 📡 API Endpoints

### Analysis
```http
POST /analyze
Content-Type: application/json

{
  "code": "your code here",
  "language": "python"
}
```

### File Upload
```http
POST /upload
Content-Type: multipart/form-data

file: <source code file>
```

### Supported Languages
```http
GET /languages
```

### Optimization Guide
```http
GET /docs-optimization
```

### Health Check
```http
GET /health
```

## 📊 Analysis Output

The analyzer returns:

```json
{
  "language": "python",
  "performance_score": 75,
  "loops": {
    "loops_found": 3,
    "max_nesting_depth": 2,
    "loops": [
      {
        "type": "for",
        "line": 10,
        "code": "for i in range(n):",
        "nesting_level": 1,
        "condition": "i in range(n)"
      }
    ]
  },
  "recursion": {
    "has_recursion": false,
    "recursive_functions": [],
    "tail_recursive": []
  },
  "time_complexity": {
    "estimated_complexity": "O(n²)",
    "loops": 2,
    "has_recursion": false,
    "basis": "Loop nesting and recursion analysis"
  },
  "space_complexity": {
    "estimated_complexity": "O(1)",
    "factors": []
  },
  "optimizations": [
    {
      "category": "Loop Optimization",
      "suggestion": "Use loop unrolling to reduce branch prediction misses",
      "impact": "Medium",
      "priority": "High"
    }
  ]
}
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
# Lint code
pylint *.py

# Run with test mode
python -m pytest tests/ -v
```

### Frontend Tests
```bash
cd frontend
# Lint code
npm run lint

# Build verification
npm run build
```

### Integration Test
```bash
# With docker-compose running
curl http://localhost:8000/health
curl http://localhost:3000
```

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflow that:
- ✅ Builds Python backend with dependency check
- ✅ Builds React frontend with Vite
- ✅ Runs linting on both services
- ✅ Tests docker-compose build
- ✅ Performs security scans with Trivy
- ✅ Validates health endpoints

Triggered on:
- Push to `main` and `develop` branches
- Pull requests to `main` and `develop` branches

## 🐳 Docker Images

### Build Locally
```bash
# Backend
docker build -t compiler-advisor-backend:latest ./backend

# Frontend
docker build -t compiler-advisor-frontend:latest ./frontend

# Both
docker-compose build
```

### Environment Variables

Frontend:
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

Backend:
- `PYTHONUNBUFFERED`: Set to 1 for real-time logging

## 📈 Performance Scoring Algorithm

Performance Score is calculated based on:
- **Loop Nesting**: -10 points per nesting level (max -30)
- **Non-tail Recursion**: -15 points
- **Time Complexity**: 
  - O(n²) or O(n³): -20 points
  - O(2ⁿ): Additional -10 points
- **Good Complexity Bonuses**:
  - O(1): +5 points
  - O(log n): +3 points

Base score: 100
Final score: 0-100 range

## 🎨 UI Components

### Dashboard
- Performance score visualization (donut chart)
- Metrics cards (language, loops, nesting, recursion)
- Complexity analysis cards
- Optimization recommendations list
- Detailed loop analysis

### Analyzer
- Language selector
- File upload interface
- Code editor (textarea)
- Analysis trigger button
- Supported languages showcase
- Feature overview

## 📦 Dependencies

### Frontend
- React 19.2.6
- Vite 8.0.12
- React Router DOM 7.0.0
- Axios 1.7.0
- Recharts 2.10.0
- Tailwind CSS 3.4.0

### Backend
- FastAPI 0.104.1
- Uvicorn 0.24.0
- Pydantic 2.5.0
- Python 3.11+

## 🛠️ Development Tools

- **Frontend Build**: Vite with React plugin
- **Frontend Styling**: Tailwind CSS
- **Backend Framework**: FastAPI with async support
- **Code Quality**: ESLint, Pylint
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions

## 🔐 Security Features

- CORS middleware configured
- Input validation (Pydantic models)
- File upload size validation
- UTF-8 encoding checks
- Security scanning with Trivy

## 📝 Code Examples

### Python Code Analysis
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```
Analysis:
- Loops: 2
- Max Nesting: 2
- Time Complexity: O(n²)
- Space Complexity: O(1)

### Recursive Function Analysis
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
Analysis:
- Has Recursion: Yes
- Tail Recursive: No
- Time Complexity: O(2ⁿ)
- Recommendation: Use memoization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created as a Design and Analysis of Algorithms (DAA) project to help developers understand and optimize their code performance.

## 🙏 Acknowledgments

- FastAPI community for excellent documentation
- React and Vite teams for amazing development experience
- Recharts for beautiful charting components
- Tailwind CSS for utility-first styling

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review API documentation at `/docs`

## 🗺️ Roadmap

- [ ] Support for more languages (Go, Rust, JavaScript)
- [ ] Advanced recursion pattern recognition
- [ ] Machine learning-based optimization suggestions
- [ ] Real-time collaborative analysis
- [ ] Performance comparison history
- [ ] Export analysis reports (PDF, JSON)
- [ ] Integration with GitHub for code repository analysis

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Active Development ✅
