# Advanced To-Do List Project

이 프로젝트는 React와 Redux Toolkit을 사용하여 구현한 고성능 할 일 관리(To-Do List) 어플리케이션입니다. 사용자 경험을 고려한 카테고리 분류와 상태 관리 최적화에 중점을 두었습니다.

## 🚀 주요 기능

### 1. 카테고리별 할 일 관리
- **상태 분류**: '할 일(To Do)', '진행 중(Doing)', '완료(Done)' 세 가지 카테고리로 작업을 분류할 수 있습니다.
- **카테고리 이동**: 각 할 일 항목의 버튼을 클릭하여 즉시 다른 카테고리로 상태를 변경할 수 있습니다.

### 2. 효율적인 폼 핸들링
- **React Hook Form**: 유효성 검사와 폼 데이터 제출을 위해 `react-hook-form`을 사용하여 비제어 컴포넌트 방식의 효율적인 입력을 구현했습니다.

### 3. 전역 상태 관리
- **Redux Toolkit**: 전체 할 일 목록과 현재 선택된 카테고리를 전역 상태로 관리하여 컴포넌트 간의 데이터 전달을 최적화했습니다.
- **Selector 활용**: 필요한 카테고리의 아이템만 필터링하여 렌더링하는 로직을 포함합니다.

### 4. 스타일링 및 테마
- **Styled-components**: 다크 모드와 라이트 모드 확장이 용이한 테마 시스템을 적용했습니다.

## 🛠 기술 스택

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit (RTK), React Redux
- **Form Handling**: React Hook Form
- **Styling**: Styled-components

## 📦 실행 방법

```bash
npm install
npm start
```

## 📂 프로젝트 구조

```text
src/
├── components/     # ToDoList, CreateToDo, ToDo 등 개별 컴포넌트
├── reducers/       # ToDo 상태 및 액션을 정의한 Slice
├── store/          # Redux Store 설정
├── theme.ts        # 테마 컬러 설정
└── index.tsx       # Entry point
```
