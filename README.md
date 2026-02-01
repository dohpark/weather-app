# 날씨 정보 애플리케이션

한국 지역의 날씨 정보를 제공하는 웹 애플리케이션입니다. 현재 위치 기반 날씨 조회, 즐겨찾기 기능, 상세 날씨 정보 및 레이더 맵을 제공합니다.

🌐 **배포 URL:** [https://weather-app-five-omega-h3vrh5zf98.vercel.app/](https://weather-app-five-omega-h3vrh5zf98.vercel.app/)

## 🚀 프로젝트 실행 방법

1. **의존성 설치**
   ```bash
   pnpm install
   ```

2. **환경 변수 설정**
   프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:
   ```
   VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```
   > OpenWeatherMap API 키는 [OpenWeatherMap](https://openweathermap.org/api)에서 발급받을 수 있습니다.

3. **개발 서버 실행**
   ```bash
   pnpm dev
   ```

4. **빌드**
   ```bash
   pnpm build
   ```

## ✨ 구현한 기능

### 메인 페이지

- **현재 위치 기반 날씨 정보**
  - 브라우저 Geolocation API를 통해 현재 위치 권한을 요청합니다
  - 위치 권한을 허용하면 현재 위치의 날씨 정보를 자동으로 표시합니다
  - OpenWeatherMap API를 통해 실시간 날씨 데이터를 조회합니다

- **3시간 단위 24시간 날씨 예보**
  - 히어로 섹션에 3시간 간격으로 24시간 동안의 날씨 예보를 표시합니다
  - 기온, 날씨 상태의 정보를 제공합니다

- **즐겨찾기 목록**
  - 메인 페이지 하단에 즐겨찾기한 위치 목록을 표시합니다
  - 각 즐겨찾기 카드에는 다음 정보가 표시됩니다:
    - 현재 기온
    - 최저/최고 기온
  - 즐겨찾기 카드 제목 우측의 수정 아이콘을 클릭하면 제목을 수정할 수 있습니다
  - 즐겨찾기는 최대 6개까지 추가 가능합니다

- **위치 검색**
  - 좌측 상단의 검색 아이콘을 클릭하면 검색 모달이 나타납니다
  - 검색창에 주소를 입력하면 실시간으로 검색 결과가 표시됩니다
  - 검색 결과에서 원하는 위치를 선택해야 상세 페이지로 이동합니다
  - 부분 일치 검색을 지원합니다

### 상세 페이지

- **선택한 위치의 상세 날씨 정보**
  - 현재 기온
  - 오늘의 최저/최고 기온
  - 3시간 단위 24시간 동안의 날씨 예보

- **즐겨찾기 추가**
  - 헤더 우측의 별표 아이콘을 클릭하여 현재 위치를 즐겨찾기에 추가할 수 있습니다

- **레이더 맵**
  - OpenWeatherMap API에서 제공하는 타일 맵을 사용합니다
  - 다음 레이어를 제공합니다:
    - 강수량 (Precipitation)
    - 온도 (Temperature)
    - 바람 (Wind)
    - 구름 (Clouds)
  - 선택한 위치를 마커로 표시하여 기준 위치를 명확히 확인할 수 있습니다

## 🛠 기술 스택

### 핵심 프레임워크 & 라이브러리
- **React 19.2.0** - UI 라이브러리
- **TypeScript** - 타입 안정성을 위한 정적 타입 언어
- **Vite 7.2.4** - 빠른 개발 환경 및 빌드 도구

### 상태 관리 & 데이터 페칭
- **TanStack React Query 5.90.20** - 서버 상태 관리 및 데이터 페칭
- **Zustand 5.0.10** - 클라이언트 상태 관리 (즐겨찾기)

### 라우팅
- **React Router DOM 7.13.0** - 클라이언트 사이드 라우팅

### 지도
- **Leaflet 1.9.4** - 오픈소스 지도 라이브러리
- **React Leaflet 5.0.0** - React용 Leaflet 래퍼

### 스타일링
- **Tailwind CSS 4.1.18** - 유틸리티 기반 CSS 프레임워크
- **Lucide React 0.563.0** - 아이콘 라이브러리

### HTTP 클라이언트
- **Axios 1.13.4** - HTTP 요청 라이브러리

### 개발 도구
- **ESLint** - 코드 린팅
- **TypeScript ESLint** - TypeScript 전용 린팅 규칙
- **Prettier** - 코드 포맷팅

## 🏗 프로젝트 구조

이 프로젝트는 Feature-Sliced Design (FSD) 아키텍처를 따릅니다:

```
src/
├── app/                # 애플리케이션 초기화 및 설정
│   ├── providers/      # React Query 등 프로바이더
│   └── styles/         # 전역 스타일
├── pages/              # 페이지 컴포넌트
│   ├── main/           # 메인 페이지
│   └── detail/         # 상세 페이지
├── widgets/            # 복합 UI 컴포넌트 (entities + features 조합)
│   ├── hero-section/   # 히어로 섹션 (현재 날씨 + 시간별 예보)
│   └── favorite-list/  # 즐겨찾기 목록 (컨테이너 + 카드)
├── features/           # 사용자 액션/기능
│   ├── favorites/      # 즐겨찾기 추가/삭제/수정
│   ├── geolocation/    # 현재 위치 감지
│   └── search/         # 위치 검색
├── entities/           # 비즈니스 엔티티
│   ├── favorite/       # 즐겨찾기 타입
│   ├── location/       # 위치 (Geocoding, 주소 데이터)
│   └── weather/        # 날씨 (API, 타입, 유틸)
└── shared/             # 공유 리소스
    ├── api/            # API 클라이언트 (axios 설정)
    ├── config/         # 환경 변수
    └── ui/             # 공유 UI 컴포넌트 (WeatherRadarMap)
```

### 레이어 의존성 규칙

```
app → pages → widgets → features → entities → shared
```

상위 레이어는 하위 레이어만 import 가능합니다. 역방향 import는 금지됩니다.

## 📋 기술적 의사결정 및 이유

### 기술적 결정 1

사용자가 입력한 한국 주소(예: `경기도-안양시동안구-호계동`)를 위도/경도(lat, lon)로 변환해야 하는 요구사항이 있었습니다.

다음과 같은 Geocoding API 후보들을 검토했습니다:

| 후보 | 문제점 |
| --- | --- |
| OpenWeatherMap Geocoding API | 한국 행정주소 인식률 매우 낮음 (동/리 단위 거의 실패) |
| Mapbox | 한국 행정주소 인식률 낮을 가능성 높음 |
| Kakao / Naver | 한국 주소에 최적화, 정확도 매우 높음 |

**결론:** 한국 주소 Geocoding은 사실상 Kakao / Naver 외에는 정확도가 부족했습니다.

### 1. Kakao Local API 채택

**결정:** Kakao Local API를 사용하여 한국 주소를 좌표로 변환

**이유:**
- 한국 행정동/리/면 단위까지 정확히 매칭 가능
- `b_code`, `h_code` 같은 행정코드까지 반환
- 실제 테스트하여 검증 완료

### 2. 프론트엔드에서 REST API 직접 호출 금지

**결정:** 프론트엔드에서 Kakao REST API를 직접 호출하지 않음

**이유:**
- REST Key가 DevTools Network에서 노출됨
- 누구나 키 탈취 가능하여 쿼터 소진 및 보안 사고 위험

### 3. Kakao JS SDK 미사용

**결정:** Kakao Maps SDK의 `Geocoder()`를 사용하지 않음

**이유:**
- 지도 기능이 필요 없어 SDK 의존성 증가는 불필요
- 번들 사이즈 증가

### 4. AWS Lambda + Function URL 사용

**결정:** 프론트엔드 → Lambda → Kakao API 구조 채택

**아키텍처:**
```
Vite Frontend
     ↓
AWS Lambda Function URL
     ↓
Kakao Local API
```

**이유:**
- REST Key가 외부에 노출되지 않음
- API 호출을 서버에서 통제 가능
- 추후 캐싱, 로깅, rate limit, 확장 가능
- 프론트는 단순 GET 요청만 수행

### 5. SSM Parameter Store 사용

**결정:** Secrets Manager 대신 SSM Parameter Store에 Kakao REST Key 저장

**이유:**
- Secrets Manager는 유료, SSM Parameter Store는 무료
- Kakao REST Key는 SSM Parameter Store의 SecureString으로 충분
- Lambda에서만 복호화 가능하도록 IAM 설정

### 최종 아키텍처

```
User Input Address
      ↓
Vite Frontend (GET only, no headers)
      ↓
AWS Lambda Function URL (CORS 처리)
      ↓
SSM Parameter Store에서 Kakao Key 읽기
      ↓
Kakao Local Address API 호출
      ↓
lat, lon + 행정코드 반환
```

### 결과

| 항목 | 결과 |
| --- | --- |
| 한국 주소 인식률 | 매우 높음 (동/리 단위까지 정확) |
| 보안 | REST Key 외부 노출 없음 |
| 비용 | Lambda + SSM 무료 구간 |
| 확장성 | rate-limit 추가 가능 |
| 프론트 복잡도 | 매우 단순 (`GET /?q=주소`) |

---

### 기술적 결정 2

레이더 맵(Weather Radar Map) 구현을 위해 지도 라이브러리, 베이스맵 타일 공급자, OpenWeather 날씨 타일 오버레이 구조를 결정해야 했습니다.

**핵심 전제:**
- OpenWeather는 벡터 데이터가 아니라 **raster tile (`{z}/{x}/{y}.png`)** 방식으로 날씨 정보를 제공
- 이 타일은 "지도 위에 얹는 오버레이" 용도로 설계되어 있으며, 단독 사용 시 지리 정보가 부족

저는 OpenWeather raster 타일을 가장 단순하고 안정적으로 얹을 수 있는 구조를 고르는 방향으로 의사결정 방향을 잡았습니다.

### 1. Leaflet + react-leaflet v5 채택

**결정:** 지도 라이브러리로 Leaflet과 react-leaflet v5 사용

**대안 비교:**

| 후보 | 장점 | 단점 |
| --- | --- | --- |
| Mapbox GL JS | 벡터, 스타일링, WebGL 강력 | 토큰/약관/설정 복잡, raster overlay 비효율 |
| **Leaflet** | raster tile overlay에 최적, 단순, 가벼움 | 벡터/3D 고급 기능 약함 |

**이유:**
- OpenWeather 타일은 `TileLayer`로 바로 올리는 구조가 가장 자연스럽음
- Leaflet은 raster 타일 기반 라이브러리라 이 구조에 정확히 맞음
- React 19 환경에서 `react-leaflet@5`가 공식 peer dependency로 지원됨
- 초기 요구사항을 가장 빠르고 단순하게 만족시킬 수 있음

### 2. CARTO Positron 베이스맵 사용

**결정:** 베이스맵 타일로 CARTO Positron 사용

**베이스맵이 필요한 이유:** OpenWeather 타일은 반투명 오버레이이므로, 지리적 맥락(도로/지형/위치)을 제공하는 베이스맵이 필요합니다.

**대안 비교:**

| 후보 | 문제점 |
| --- | --- |
| OSM 기본 타일 | 시각적으로 복잡, 오버레이 가독성 저하 |
| Mapbox/MapTiler | 토큰/과금/운영 고려 필요 |
| **CARTO Positron** | 미니멀, 오버레이 친화적 |

**이유:**
- Positron 스타일은 미니멀한 디자인으로 지도 자체는 배경 역할을 하고, 그 위의 오버레이(날씨 타일)가 시각적으로 주인공이 되는 구조
- OpenWeather 같은 컬러 레이어와 궁합이 매우 좋음
- 계정/토큰 없이 URL로 사용 가능

### 3. React 19 + Vite 구성

**결정:** react-leaflet v5를 사용하고, Vite에서 Leaflet CSS를 import

**이유:**
- Leaflet은 DOM 기반 라이브러리 → React 생명주기 관리 필요
- react-leaflet이 이를 래핑하여 React 방식으로 안전하게 사용 가능
- v5부터 React 19를 정식 지원
- Leaflet은 CSS가 없으면 타일/마커가 정상 표시되지 않음
- Vite에서는 `import 'leaflet/dist/leaflet.css'` 한 줄로 해결

### 레이더 맵 최종 아키텍처

```
[ CARTO Positron Base Tile ]
            +
[ OpenWeather Raster Tile Overlay ]
            ↓
        Leaflet (react-leaflet)
            ↓
      React19 + Vite
```

### 레이더 맵 구현 결과

| 항목 | 결과 |
| --- | --- |
| 구현 복잡도 | 최소 (raster tile overlay 구조) |
| 오버레이 가독성 | 우수 (Positron 베이스맵) |
| React 19 호환성 | 공식 지원 (react-leaflet v5) |

---

### 기술적 결정 3

즐겨찾기 기능은 페이지 새로고침이나 재접속 이후에도 유지되어야 하므로 localStorage 기반의 영속화가 필요했습니다.

### Zustand + persist 미들웨어 사용

**결정:** 상태 관리 라이브러리로 Zustand를 사용하고, `persist` 미들웨어로 localStorage 연동

**이유:**
- 즐겨찾기 상태를 새로고침 후에도 유지해야 함 → localStorage 영속화 필요
- localStorage를 직접 다루면 저장/복원/동기화 코드가 여러 곳에 흩어져 유지보수성이 떨어짐
- Zustand의 `persist` 미들웨어로 store 단에서 영속화를 처리하면 구현이 단순해지고 상태 일관성 확보
- 규모 대비 도입 비용이 낮고(가벼움), 필요한 기능만 깔끔하게 적용 가능

