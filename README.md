# NC React Intermediate Course Projects

이 저장소는 React 중급 과정을 통해 제작된 여러 프로젝트들을 포함하고 있습니다. 각 프로젝트는 기능과 학습 주제에 따라 별도의 브랜치로 나누어 관리되고 있습니다.

## 🌿 브랜치별 프로젝트 안내

| 브랜치명 | 프로젝트명 | 주요 학습 기술 | 설명 |
| :--- | :--- | :--- | :--- |
| **`trello-clone`** | Trello Clone | Pragmatic DND, Redux Toolkit | 보드 간 카드 이동 및 순서 변경이 가능한 칸반 보드 |
| **`netflix-clone`** | Netflix Clone | Motion, React Query | 영화/TV 시리즈 목록 조회 및 상세 정보, 검색 기능이 포함된 클론 코딩 |
| **`crypto-tracker`** | Crypto Tracker | React Query, ApexCharts | 실시간 암호화폐 시세 확인 및 차트 시각화 |
| **`todo-list`** | To-Do List | React Hook Form, Redux | 카테고리별 할 일 관리 및 상태 유지 기능 |
| **`animation`** | Animation Practice | Motion | 제스처, 레이아웃 전환 등 다양한 UI 애니메이션 실습 |

---

## 🛠 공통 기술 스택

- **Core**: React 19, TypeScript
- **Styling**: Styled-components
- **Build Tool**: Create React App (CRA)

---

## 🚀 브랜치 전환 및 실행 방법

원하는 프로젝트의 브랜치로 전환하여 실행할 수 있습니다.

### 1. 브랜치 전환
```bash
# 원하는 브랜치로 전환 (예: trello-clone)
git checkout <branch-name>
```

### 2. 의존성 설치 및 실행
```bash
npm install
npm start
```

---

## 📂 프로젝트 공통 구조

```text
src/
├── components/     # UI 컴포넌트
├── reducers/       # Redux Slices (필요시)
├── store/          # Store 설정 (필요시)
├── theme.ts        # 공통 테마 설정
└── index.tsx       # 엔트리 포인트
```

---
> [!NOTE]
> 모든 프로젝트의 통합 README입니다. 상세 내용은 각 브랜치의 README를 참고하시거나 코드를 확인해 주세요.
