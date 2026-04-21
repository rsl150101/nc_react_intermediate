# Netflix Clone Project

이 프로젝트는 React와 TypeScript를 사용하여 구현한 넷플릭스(Netflix) 서비스 클론 코딩 어플리케이션입니다. `motion`을 활용한 화려한 애니메이션과 TMDb API를 연동한 실시간 영화/TV 시리즈 데이터를 제공합니다.

## 🚀 주요 기능

- **홈 화면 (Home)**: 최신 영화 목록을 슬라이더 형식으로 제공하며, 마우스 오버 시 상세 정보를 보여주는 애니메이션이 적용되어 있습니다.
- **TV 프로그램 (TV)**: 인기 있는 TV 시리즈 목록을 조회할 수 있습니다.
- **검색 기능 (Search)**: 영화 및 TV 프로그램 제목으로 검색이 가능합니다.
- **상세 정보 모달**: 각 콘텐츠를 클릭하면 상세 줄거리와 정보를 모달 형태로 확인할 수 있습니다.
- **반응형 네비게이션**: 스크롤 시 배경색이 변하는 투명 헤더와 검색창 애니메이션이 구현되어 있습니다.

## 🛠 기술 스택

- **Frontend**: React 19, TypeScript
- **Animation**: motion
- **State Management**: Redux Toolkit (RTK)
- **Routing**: React Router Dom v7
- **Styling**: Styled-components
- **Data Fetching**: TMDb API (Redux Toolkit Query 또는 Custom Hooks 활용)

## 📦 실행 방법

```bash
npm install
npm start
```
> [!IMPORTANT]
> API 연동을 위해 `.env` 파일에 TMDb API Key 설정이 필요할 수 있습니다.

## 📂 프로젝트 구조

```text
src/
├── Routes/         # Home, Tv, Search 등 페이지 컴포넌트
├── components/     # Header 등 공용 UI 컴포넌트
├── features/       # 도메인별 상태 관리 로직
├── api/            # API 요청 정의
├── hooks/          # 커스텀 훅
└── theme.ts        # 넷플릭스 스타일 테마 설정
```
