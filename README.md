# Animation Practice Project

이 프로젝트는 React와 `motion`을 사용하여 다양한 UI 애니메이션 기법을 실습하고 구현한 어플리케이션입니다.

## 🚀 주요 학습 및 구현 기능

### 1. Shared Element Transition (layoutId)
- `layoutId`를 활용하여 서로 다른 컴포넌트 간에 자연스러운 요소 전환 효과를 구현했습니다.
- 그리드 내의 박스를 클릭하면 해당 요소가 커지면서 중앙 모달(Overlay)로 변하는 애니메이션이 적용되어 있습니다.

### 2. AnimatePresence
- 컴포넌트가 DOM에서 추가되거나 제거될 때의 애니메이션(Mount/Unmount)을 처리합니다.
- 오버레이 배경의 페이드 인/아웃 효과를 위해 사용되었습니다.

### 3. Variants 및 제스처 애니메이션
- `Variants` 객체를 정의하여 복잡한 애니메이션 상태(hidden, visible, exit)를 선언적으로 관리합니다.
- Styled-components와 Motion의 결합을 통해 스타일과 애니메이션을 동시에 정의했습니다.

### 4. 레이아웃 애니메이션
- `layout` 속성을 통해 리스트의 순서 변경이나 크기 변화를 부드럽게 처리하는 기법을 포함합니다.

## 🛠 기술 스택

- **Frontend**: React 19, TypeScript
- **Animation**: motion
- **Styling**: Styled-components

## 📦 실행 방법

```bash
npm install
npm start
```

## 📂 프로젝트 구조

```text
src/
├── App.tsx         # 애니메이션 로직 및 레이아웃이 포함된 메인 컴포넌트
├── theme.ts        # 스타일 테마 설정
├── styled.d.ts     # Styled-components 타입 정의
└── index.tsx       # Entry point
```

## 📝 학습 노트 (Notes)

### **Core Concepts**
- **`motion`**: HTML 요소에 애니메이션 기능을 부여합니다.
- **`layoutId`**: 두 요소 간의 위치나 크기 변화를 부드럽게 연결(Transition)해주는 고유 식별자입니다. 'Shared Element Transition'의 핵심 기술입니다.
- **`Variants`**: 애니메이션의 시작(initial), 중간(animate), 끝(exit) 상태를 정의하는 객체로, 복잡한 순차 애니메이션을 관리하는 데 유용합니다.
- **`AnimatePresence`**: 자식 컴포넌트의 마운트/언마운트 시 애니메이션을 적용할 수 있게 해주는 컴포넌트입니다.

### **Styling & Animation Integration**
- Styled-components의 `styled.motion.div` 문법을 사용하여 CSS-in-JS와 애니메이션을 결합했습니다.
- `styled.div<motion.div>` 형태로도 작성할 수 있습니다.
- `variants`를 적용할 때는 `styled-components`의 `motion.div`를 사용해야 하며, 일반 `div`에는 속성으로 전달해야 합니다.

### **Layout Transitions**
- 리스트 정렬 시 아이템들이 자연스럽게 이동하는 현상은 `layout` 속성 또는 `layoutId`를 통해 자동으로 처리됩니다.

### **Tips**
- `variants`를 재사용하려면 `variants` 객체 자체를 `motion.div`에 props로 전달합니다.
