# Whale Developers

**요약: "Flutter와 Spring Boot로 구현한 면접 질문 연습용 모바일 애플리케이션”**

**개발 기간: “2025. 09.14 ~ 10.27”**

**핵심 기술 스택:**  Flutter+Dart, Spring Boot, Java21, MongoDB, cloudflared

---
### ⚡ App apk file : 추후 추가
### 💿 Demo Video: [youtube.com](https://www.youtube.com/shorts/42vOmymjEV8?feature=share)
### 📖 More Info: [notion.com](https://dot-woodwind-39a.notion.site/whale-devs-299303eae1f280a9a4f3d8a54a042f1f)
### 🙆‍♂️ 개발자 포트폴리오 [notion.com](https://www.notion.so/PORTFOLIO-19e303eae1f280828d69f4b34a9654a7)
---

### 📖 소개

신입 개발자를 위한 기술 면접 연습용 모바일 애플리케이션 프로젝트입니다.

사용자는 카테고리(Java,Spring..)를 선택하여 랜덤한 문제 5개를 풀어 볼 수 있습니다.

---

🗺️ 시스템 아키텍처 (Architecture)

<img width="1241" height="844" alt="image" src="https://github.com/user-attachments/assets/d5871c42-d605-44f3-b4a3-3b53f419d13a" />

구성 설명 :


1. 읽기 중심(Read-Heavy) 서비스에 최적화된 MongoDB 사용

2. 사용자용(Flutter)과 관리자용(React) 클라이언트의 역할을 분리

3. SQLite를 이용한 오프라인 학습 환경 지원 (Offline-first)

4. `cloudflared`를 활용한 비용 효율적인 배포

---

### 🚀 주요 기능

[ Flutter App ]
- 질문 연습 : 랜덤 질문 뽑기, 결과 확인
- 기록      : 풀었던 문제 확인
<img width="2048" height="990" alt="image" src="https://github.com/user-attachments/assets/b6d7faf6-7cb2-4f1e-a41f-9cb96a1b5399" />


[ React Web (Admin) ]
- 데이터 관리 (CRUD) : 면접 질문 및 카테고리 생성

[ Server Spring boot ]
- API 제공 : Flutter와 React에 필요한 데이터 JSON 형태로 제공

---

### 🛠️ 사용 기술 스택

### 1. Backend (Spring Boot)

- **Language   :** Java 21
- **Database    :** MongoDB
- **API Design :** **RESTful API**
- **API Documentation :** **OpenAPI** (swagger)

### 2. Admin Frontend (React)

- **UI Framework :** **MUI (Material-UI)**
- **Form Management :** **Formik** + **Yup**
- **API Communication :** Axios
- **Routing :** React Router DOM
- **User Feedback :** Notistack (for alerts/snackbars)

### 3. User App (Flutter)

- **Language :** Dart
- **State Management :** **Riverpod**
- **Routing :** **Go_Router**
- **Local Database :** **Drift + SQLite**
- **API Communication :** **Dio** + **Retrofit**

---

### ⚙️ 배포 환경

- OS: Ubuntu Linux
- Domain : Cloudflare
- Hardware: Laptop
