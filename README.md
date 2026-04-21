# Trello Clone Project

이 프로젝트는 React와 TypeScript를 기반으로 한 트레로(Trello) 스타일의 작업 관리 어플리케이션입니다. `@atlaskit/pragmatic-drag-and-drop` 라이브러리를 사용하여 유연하고 직관적인 드래그 앤 드롭 경험을 제공합니다.

## 🚀 주요 기능

### 1. 보드(Board) 및 카드(Card) 관리
- **보드 추가**: 새로운 작업 보드를 생성하여 관리 단위를 확장할 수 있습니다.
- **카드 추가**: 각 보드 내에 구체적인 할 일(To-Do) 카드를 추가할 수 있습니다.
- **삭제 존(Delete Zone)**: 하단에 위치한 삭제 영역으로 드래그하여 보드나 카드를 즉시 삭제할 수 있습니다.

### 2. 고도화된 드래그 앤 드롭
- **카드 정렬**: 동일 보드 내에서 카드의 순서를 자유롭게 변경할 수 있습니다.
- **보드 이동**: 보드 간에 카드를 이동시켜 작업 상태를 변경할 수 있습니다.
- **보드 정렬**: 보드 자체를 드래그하여 보드 간의 순서를 조정할 수 있습니다.

### 3. 데이터 영속성 (Persistence)
- **Redux Middleware**: 상태가 변경될 때마다 `localStorage`에 자동 저장됩니다.
- **자동 복구**: 페이지를 새로고침하거나 다시 방문해도 이전의 작업 상태가 그대로 유지됩니다.

## 🛠 기술 스택

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit (RTK)
- **Drag & Drop**: @atlaskit/pragmatic-drag-and-drop
- **Styling**: Styled-components
- **Form Handling**: React Hook Form
- **Icons**: FontAwesome (`@fortawesome/react-fontawesome`)

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm start
```

## 📂 프로젝트 구조

```text
src/
├── components/     # Board, Card, Modal, DeleteZone 등 핵심 UI
├── reducers/       # To-Do 및 보드 상태 관리를 위한 Slice
├── middlewares/    # LocalStorage 동기화 로직
├── store/          # Redux Store 설정
├── utils/          # ID 생성 등 유틸리티 함수
└── theme.ts        # 테마 컬러 및 스타일 설정
```
