# Crypto Tracker Project

이 프로젝트는 React와 TypeScript를 사용하여 실시간 암호화폐 시세를 조회하고 시각화하는 어플리케이션입니다. React Query를 통한 효율적인 데이터 페칭과 ApexCharts를 이용한 인터랙티브한 차트 구현에 중점을 두었습니다.

## 🚀 주요 기능

### 1. 암호화폐 목록 조회 (Coins)
- 시가총액 기준 상위 암호화폐 목록을 실시간으로 불러와 표시합니다.
- 각 코인의 아이콘과 이름을 리스트 형식으로 깔끔하게 보여줍니다.

### 2. 코인 상세 정보 (Coin Detail)
- 선택한 코인의 랭킹, 심볼, 현재 가격, 총 공급량 등 상세 정보를 제공합니다.
- 탭 시스템을 통해 '차트(Chart)'와 '가격 정보(Price)'를 구분하여 확인할 수 있습니다.

### 3. 데이터 시각화 (ApexCharts)
- `apexcharts`를 사용하여 코인의 가격 변동 추이를 캔들스틱 또는 라인 차트로 시각화했습니다.
- 실시간 데이터를 기반으로 한 인터랙티브한 그래프 경험을 제공합니다.

### 4. 효율적인 데이터 관리 (React Query)
- `@tanstack/react-query`를 사용하여 데이터 캐싱, 자동 리페칭, 로딩 상태 관리 등을 최적화했습니다.

### 5. 테마 시스템
- 다크 모드와 라이트 모드를 지원하며, 전역 상태(Redux 또는 Context)를 통해 테마를 전환할 수 있습니다.

## 🛠 기술 스택

- **Frontend**: React 19, TypeScript
- **Data Fetching**: React Query (TanStack Query) v5
- **Visualization**: ApexCharts, React ApexCharts
- **Routing**: React Router Dom v7
- **Styling**: Styled-components
- **State Management**: Redux Toolkit (Theme 관리 등)

## 📦 실행 방법

```bash
npm install
npm start
```

## 📂 프로젝트 구조

```text
src/
├── routes/         # Coins, Coin, Chart, Price 등 주요 페이지 컴포넌트
├── api.ts          # API 호출 함수 정의
├── Router.tsx      # 라우팅 경로 설정
├── theme.ts        # 다크/라이트 테마 설정
└── index.tsx       # Entry point 및 QueryClientProvider 설정
```
