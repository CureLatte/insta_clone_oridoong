## 회의록 및 정리 할 내용

***

### 목차 

* [규칙](#규칙)
* [정리 문서](#정리-문서)
  * [팀프로젝트 Github 주소](https://github.com/CureLatte/insta_clone_oridoong.git)
  * [팀프로젝트 블로그 주소](https://jscript.tistory.com/)
  * [Github 관련](#Github)
  * [데이터 DB 관련](#DataBase)
  * [css 공통](#css-및-공통 )
  * [기능 모음](#기능들)
  * [공통 스타일 관련](#Frontend-관련)
  * 

* [현황](#현황)
  * [회의록](#회의록)
  * [일정](#일정)
  * [문제들](#문제들)

* [개인 공간](#개인-공간)
  * [김재성님](#김재성)
  * [이성오님](#이성오)
  * [정심일님](#정심일)
  * [김호 님](#김호)
  * [문경민님](#문경민)


***

## 규칙 

<br>

* #### 회의 시간 
  * 시작 : 오전 10시 - 당일 계획 작성 및 현황 브리핑
  * 마무리 : 오후 9시 - 당일 구현한 것들 작성  


* #### 점심시간 : 각자 자유 롭게 먹기! 
  * 최대 1시간 이상을 되도록 비워 두지 말도록 합시다!

* #### 개인 공간 은 자유 롭게 써 주시면 됩니다. 
  * 메모하거나 팀원들이 봐야 하는 내용 위주로 올려 주세요.
  * 간단한 작업 내용도 공유해 주시면 좋을 것 같습니다.

* #### Pull Request 오후 5시에 한번 씩 누르기!

***

<br>
<br>
<br>

## 정리 문서

***

### Github 관련

<br>

* ```Push 할 때``` : 커맨드 앞에다 붙이기
  * ```생성``` - 
  * ```추가``` -
  * ```수정``` - 
  
<br>

* ```branch```에서 작업하고 ```pull-request 요청하기```


* 요청 하실 때 ```gather``` 나 ```slack``` 에서 말씀 해주세요 

***

### DataBase

<br>

* ```user```  : 회원 테이블
  * ```user_id``` :　　 　`<string> ` 로그인 ID
  * ```name``` :  　　&nbsp;&nbsp;　　`<string>` 실제 이름
  * ```username```:　　　 `<string>` 별칭
  * ```gender```: 　　　　`<string>` 성별
  * ```email```: 　　&nbsp;&nbsp;　　`<string>` 이메일 주소
  * ```photo_number```:　 `<string>` 전화 번호
  * ```bio```: 　　　&nbsp;&nbsp;　　`<string>` 자기 소개
  * ```avatar```:　　　　 `<string>` 프로필 사진


* ```post_content``` 
  * ```user_id``` :　　　 ```<string>``` 작성자
  * ```photo``` :　　　　 ```<string>``` 사진
  * ```desc``` : 　　　　&nbsp;&nbsp;```<string>``` 설명
  * ```comment```: 　　&nbsp;　`<List>`댓글내용
  * ```like```: 　　　&nbsp;&nbsp;&nbsp;　`<int>` 좋아요

***

### css 및 공통 
- 김호님 작성

<br>

* ```class```
  * ```header``` : 머릿말 
  * ```sumbit button```: 제출시 버튼
  * ```cancel button```: 취소시 버튼
  * ```logo``` : logo 사진

* ```속성```
  * ```max-width : 720px```
  * ```border: 1px whitegrey solid``` : 가장 큰 외형선
  * 

***

### 기능들 

<br>

##### 페이지 별로 나눠서 작성하며 구현 된 것들만 적습니다.

<br>

* #### 홈 페이지
  * 

* #### 메인 페이지
  * 


* ##### 로그인 페이지
  * 


* #### 프로필 페이지
  * 


* #### 프로필 관리 페이지
  * 


* #### 글 작성 페이지
  * 

***

<br>
<br>
<br>
<br>
<br>
<br>



##  현황 

***

<br>


### 회의록 

***


### 12월 29일

* 회의 내용

  1. ReadMe 파일 활용 
  2. 오늘 일정 및 할일
     * 개인 작업
       * ```개인 서버 제작 완성 ```
       * ```기능 정리 및 구현```
       * ```공통 css 작성 ``` : 파일명 - "common.css"
         * >김호님이 작성 
       
     * 공통
       * DB 정리 : 회의 이후 - backend 끼리? 
         * 하나의 테이블에 박아서 추가될때마다 늘리는 방식 
         * 이성오 : 몇 가지 목록 정리를 해놈
         * 박경민 : 몇 개 넣어놈 서버쪽 아이디 
         * > DB 작성 완료 (추가 수정 예정)
       * 스타일 확정 : **개인이 맡아서?** 공동 으로?
         * > 김호님이 담당하시기로!
       
<br>

### 일정
***

* 12월 29일 - 수요일
  * ```개인 서버 제작 완성 ```
  * ```기능 정리 ```
  *``` DB 데이터 정리```
  * ```디자인 확정```
  * ```공통 부분 모으기```
  * ```공통 css 작성 ```


* 12월 30일 - 목요일
  * ```각 페이지 완성(서버, 자비스크립트, DB 연결)```
  * ```서버 오픈 및 세팅```


* 12월 31일 - 금요일
  * ```각 페이지 통합``` 
  * 


* 1월 1일 - 토요일


* 1월 2일 - 일요일


* 1월 3일 - 월요일
  * ```영상 촬영 및 편집```


* 1월 4일 - 완료 
  * ```제출```

<br>


***

### 문제들

<br>


* ~~원격 저장소 정리 및 사용법 습득~~
* ~~HTML 파일 파트 분할 및 코드 작성~~
* ~~소스 트리 설치 및 활용법 익히기~~
* ~~브랜치 마스터~~ 
* ~~DB 연결 설정~~ 
* ~~코드 작성 과정~~
  1. ~~각각 페이지 별 HTML, CSS, API 를 작성을 한다.~~
  2. ~~각 작성된 페이지를 한번에 통합한다.~~ 
  3. ~~공통으로 적용 되는 부분은 일단 제외 하고 작성 (추후 공지예정)~~
* ~~DB 연결~~
* DB 데이터 정리
* 공통 부분 정리(HTML)
* 스타일 및 테마 잡기
* 기능 구현 내용 정리 (각 페이지 마다 각자 작성)
* EC2 컴퓨터 대어 
* EC2 컴퓨터 설정 
* 통합 서버 개설
* 도메인 구입
* 서버 라우터 분할 및 정리
* 

***









<br>
<br>
<br>
<br>
<br>
<br>






## 개인 공간 

<br>

***

#### 김재성

<br>

##### 12월 28일 

* ~~소스 트리 설치 및 다운~~
* ~~원격 저장소 개설 및 권한 ~~
* ~~브랜츠 작업 및 merge 연습~~
* ~~프로필 메인 화면 HTML, css 작성~~
* ~~원격 저장소 오류 수정 및 재건설~~
* ~~내용 정리~~

<br>

##### 12월 29일 

* 개인 서버 개설 하기 
* DB 연결 및 테스트
* 프로필 관리 redirect 만들기
* 게시글 관리 redirect 만들기
* 각 사진 마다 누르면 해당 피드로 가기
* 헤더 파일 작성 및 디자인

***

#### 이성오

* 회원가입 페이지(sign_up.html) 생성 및 아이콘 배치
* DB 연결 및 테스트

<br>

##### 12월 29일 

* 

***

#### 문경민

<br>

##### 12월 29일 

* 

***

#### 김호

<br>

##### 12월 29일 

* 

***


#### 정심일

<br>

##### 12월 29일 

* 

***

### 

