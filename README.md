## 회의록 및 정리 할 내용

***

### 목차 

* [규칙](#규칙)
* [정리 문서](#정리-문서)
  * [팀프로젝트 Github 주소](https://github.com/CureLatte/insta_clone_oridoong.git)
  * [팀프로젝트 블로그 주소](https://jscript.tistory.com/)
  * [팀프로젝트 공개서버](http://13.209.22.134:5001/)
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
* 

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

#### [DB 접속 Link](https://cloud.mongodb.com/v2/61ca8ce0f602e3226b610deb#metrics/replicaSet/61ca8fb3026f400ffdd9a9ae/explorer/instaClone/user/find)

`SECREKEY=['TEST']`



<br>

* ```user```  : 회원 테이블
  * ```user_id``` :　　 　`<string> ` 로그인 ID
  * ```name``` :  　　&nbsp;&nbsp;　　`<string>` 실제 이름
  * ```user_name```:　　　 `<string>` 별칭
  * ```gender```: 　　　　`<string>` 성별
  * ```email```: 　　&nbsp;&nbsp;　　`<string>` 이메일 주소
  * ```photo_number```:　 `<string>` 전화 번호  000-000-000
  * ```bio```: 　　　&nbsp;&nbsp;　　`<string>` 자기 소개
  * ```avatar```:　　　　 `<string>` 프로필 사진


* ```post_content``` 
  * ```user_id``` :　　　 ```<string>``` 작성자
  * ```photo``` :　　　　 ```<string>``` 사진
  * ```desc``` : 　　　　&nbsp;&nbsp;```<string>``` 설명
  * ```comment```: 　　&nbsp;　`<List>`댓글 내용
  * ```like```: 　　　&nbsp;&nbsp;&nbsp;　`<int>` 좋아요

* test DB
  * user
    * `ID`: testid
    * `PW` : qwer1234!

***




### API

<br>

* 회원가입페이지 : @route('/sign_up') - 이성오님 


* 프로필 수정 페이지: @route('/edit_profile') - 문경민님 


* 프로필 메인 페이지 : @route("/profile_main") - 김재성님


***



### css 및 공통 

- 김호님 및 문경민님 작성

<br>

* ```class```
  * ```header``` : .input_style_text				(input type=“text”쓰시면 input에  클레스 이걸로 주시면됨)
* ```header``` : .input_style_textarea 			(textarea쓰시면 textarea에  클레스 이걸로 주시면됨)
* ```header``` : .input_style_select			(select쓰시면 select에  클레스 이걸로 주시면됨)
* ```header``` : .is_pointer 					마우스 호버했을때 그냥 커서포인트로 바꾸기 (게시물에 좋아요 같은곳에 쓰임)
* ```header``` : .common_btn					버튼같은거에 쓰시면되는데 백그라운드 색이랑 폰트색상만 바뀝니다, 크기는 스스로 정하시면 됩니다!

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
  * 가입하기 페이지 이동
  * 로그인 확인
  * 토큰 발행 
  * 휴대폰 화면 바꾸는 거 
  * 로그인 시 index_html로 이동
  * 로그인 틀리면  reload

* #### 메인 페이지
  * 스타일만 잡음



* ##### 회원가입 페이지
  * id  중복 확인 및 길이 확인
  * 비밀 번호 길이 확인 및 특수 문자 필터
  * email 특수 문자 필터
  * 성별 select 옵션 남/여 선택
  * phone 번호 양식 제공 및 필터
  * 해당 요건이 안되면 가입 button 비활성화
  * 로그인 페이지 이동 
  * DB 회원 정보 생성

- #### 프로필 수정 페이지

  - 프로필 업데이트 로직 구현과 , db 테스트까지 완료
  - 회원 탈퇴 기능
  - id  중복 확인 및 길이 확인
  * 비밀 번호 길이 확인 및 특수 문자 필터
  * email 특수 문자 필터
  * 성별 select 옵션 남/여 선택
  * phone 번호 양식 제공 및 필터
  - 사진 업로드 및 DB 연결 


* #### 프로필 메인 페이지
  * 프로필 사진 - `images-user` 폴더에서 DB에서 받은 파일명 가져오기
  * 유저 정보 GET으로 받아서 표현
  * 프로필 수정으로 이동
  * 3개씩 끊어서 표현할 수 있도록 정리
  * 


* #### 글 작성 페이지
  * 회원 확인 후 db 글 올리기
  * 게시글 정상적으로 db에 올라감 

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
       

### 12월 30일


   1. 수정 된사항
      * 피드창을 제외한 나머지 부분은  720px, 피드창 : 1000px
      * 이미지 
        * mongoDB : 파일명만 올리기
        * javascript : images-content,user 에 넣기
        * 공통 html : {% include '파일명' %}
        * 공통  css : common.css
      * 소스트리 :
        * `master에서 pull을 하면 merge 했던 시점이 본인 브랜치로들어오고 해당 시점 이후 커밋했던내용을
        덮어쓰는 것같습니다`. 
        * 즉, 자신의 브랜치가 최신 상태이며 pull을 하면 다른 분들의 작업내용 을 갖고 오는 거라 생각하시면 됩니다
        * 또한 master와 동일하게 맞추고싶다면 각 파일들을 복붙하시거나 현재 브랜치 삭제후 다시 생성하면 될 것 같습니다. 
      * 로그인 페이지 완성
      * 회원가입 페이지 완성
      * 
        
   2. 오늘 일정 및 할일
        * ```공통 부분 모으기``` 
        * ```공통 css, html 작성 ```
        * ```DB 개선```
        * ```각 페이지 완성(서버, 자비스크립트, DB 연결)```
        * ```서버 오픈 및 세팅```
        * ```index 파일 수정?```
        


### 12월 31일

1. 어제 한일 
   * 각 페이지 피드백 
   * 공통 HTML, CSS 완성 ( 경민님과 심일님 업무 변경 )
   * 전체 통합 및 현 상황 파악
   * 토큰 사용
   * 아바타


2. 목표
   * 1차 튜텨님 평가 
     * 
     * 현재 테스트 중인 DB 연동 원활히
     * 좋아요 작동, 메인 페이지 게시글 띄우기
     * css 통합  : 경민님님
     * 페이지 연결 해야한다. 각 페이지 마다
     * 메인 페이지 기능 구현 (좋아요 누르는 거, 프로필 사진 해당 링크 주기) 
     * 게시글 만들기 : 경민님 + 이성오님  
     * DB 정리 : post - 
     * ~~user - 게시글 1개~~
   
     * DB 정리 : 코멘트table - 작성자, 댓글 내용 
     * 댓글 접기 기능 ( N개만 보여 준다 )
     * 팔로우 및 팔로워 기능 (최소 5명 회원 5) 
     * 팔로워 추천 보이기 (5명 까지)
     * 로고 > 토큰에 따라 사용자 이면 main, 아니면 홈 페이지 
     * 아이콘 연결 (location.href)- 김 호님 
     * 아이콘 스타일 통일 - 경민님
     * 작성 시간 : 게시글에 작성 
     * EC2 컴퓨터 연결 : 김재성  
     * 공통 html : 헤더 파일 로고, 거색, 홈, 게슬아등등 정심일님
     * {% include 'common.html' %}
     * ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
     * 브랜치 관련 확실하게 
     * ~~하트 클릭 모션~~  
     * 브랜치 사용할 때 공동으로 사용하는 사람들에 대한 기준
     * 각자 브랜치 
  

  * endcontnet
  * 스토리?
  * 사진 여러 개 등록
  * 검색 기능
  * 프로필메인 > 사진눌렀을 때 피드..? (중요) 
  * 여러개 되면 작성 작시간이다 다름


중간 피드백 
* 가입화면 
  * 공통 css 작성할 예정 - 빠질 예정
  * input password 제거
  * 로그인 후 재 접속시 메인페이지로 재이동
  * 쿠기 관리 필요
  * 로그 아웃 기능 구현
  * 로그인 창 꽉차게 (카카오 로그인, 앱다운링크, 비밀번호 찾기 기능-비밀 번호 재지정)
  * 메인 페이지 가운데로 
  * 로고 R 빼기

* 메인 페이지 
  * 로고 교체
이성오
======================================================================
  ~~* (수정)홈버튼 - 본인 프로필로 이동 06profile_main.html 에서 @app.route('/profile_main/<user_name>')~~ 
  ~~* 게시글 더보기 누를시 외곽을 누르면 창이 사리지기~~ 
  * 댓글기능 추가 
  ~~* like DB 반영~~ 
  * comment 누르면 - 댓글 작성창
  * comment 접기기능 ( 상단 의 n개만 표시 )
======================================================================
문경민
  * 팔로우에 user 뿌리기 - 최대 5개 
  * 팔로우/ 팔로워 기능 추가             
  * (DB 추가) user - follwer 형식 미정 
  * (DB 추가) user - follow 형식 미정
======================================================================
김재성
  * 하트 히스토리 창
  * (교체)헤더 더보기를 본인 프로필 팝업창
  * 새글 만들기 - main에 추가
  * * ~~즐겨찾기~~
  * 스토리
  * 스토리 on/off?
  * (추가)로그 아웃 기능
  * 검색 기능
======================================================================
  
* 글작성 
  * css 디자인 완성!
  
* 프로필메인
  * 성별 : 남 / 여로 표기 
  * css 스타일 적용 

* 프로필 편집 페이지
  * 회원탈퇴시 바로 탈퇴됨 - 경고팝업 생성
  * 

<br>

### 일정
***

* 12월 29일 - 수요일
  * ```개인 서버 제작 완성 ``` ok 
  * ```기능 정리 ``` ok
  *``` DB 데이터 정리``` ok
  * ```디자인 확정```  
  * ```공통 부분 모으기```
  * ```공통 css, html 작성 ``` 


* 12월 30일 - 목요일
  * ```공통 부분 모으기```  ok
  * ```공통 css, html 작성 ``` ok
  * ```각 페이지 완성(서버, 자비스크립트, DB 연결)```
  * ```서버 오픈 및 세팅```
  * ```index 파일 수정?```


* 12월 31일 - 금요일
  * ```각 페이지 통합``` 
  * ```뼈대 및 기초 연결 확인```
  * ```각 페이지 디테일 업```
  * ```추가 기능 구현```


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
* ~~공통 부분 정리(HTML)~~
* 스타일 및 테마 잡기
* 기능 구현 내용 정리 (각 페이지 마다 각자 작성)
* EC2 컴퓨터 대어 
* EC2 컴퓨터 설정 
* 통합 서버 개설
* ~~도메인 구입~~
* ~~서버 라우터 분할 및 정리~~
* ~~토큰 기능 활용~~
* ~~이미지 저장 - 폴더에 파일 자체 저장하는 식~~
* 유저가 올리는 이미지를 users 폴더에 어떻게 넣을지? - 테스트 필요
* ~~이미지 제목을 어떻게 따로 빼서?~~
* 라우트 저장 
* 이미지 처리 방법 
* DB 수정 - column 


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

* ~~개인 서버 개설 하기~~ 
* ~~DB 연결 및 테스트~~
* ~~프로필 관리 redirect 만들기~~
* ~~게시글 관리 redirect 만들기~~
* 각 사진 마다 누르면 해당 피드로 가기
* ~~헤더 파일 작성 및 디자인~~
* ~~jwt~~
* ~~token 발행~~



##### 12월 30일 

* 각 사진 마다 누르면 해당 피드로 가기
* 게시글 누르면 피드로 이동 그리고 해당 게시글 부터 보이기 
* EC2 서버 열어 보기 
* EC2 서버 연결 
* token으로 사용자 확인
* 게시글 DB
* ~~게시글 갯수 넣기~~ 
* ~~팔로워 수 넣기~~
* ~~자기소개 넣기~~

***

#### 이성오

* 회원 가입 페이지(sign_up.html) 생성 및 아이콘 배치
* DB 연결 및 테스트
* 회원 가입 페이지 id 중복확인 기능, 그외 input text data 확인하는 기능.
* 다른 화면으로 페이징
* 아이콘 배치 완료

<br>

##### 12월 29일 

* 

***

#### 문경민

- edit_profile 로직완성 / html form 틀 잡기 / Done!
- DB 연동 확인 + edit_prfile 로직 테스트까지 완료 / Done!
- (회원탈퇴도 있는데 login이 먼저 완성되야 로직짜기 가능 / 로그인로직짜는곳에 붙을 예정)

##### 12월 29일 

* 

***

#### 김호

* ~~로그인 html 작성~~
* ~~회원가입 html 틀 잡기~~

##### 12월 29일 

* ~~로그인 기능 구현~~
* ~~공통스타일 작성~~ (경민님에게 토스)
* ~~로그아웃 기능 구현~~


##### 12월 30일 

* 로그인 부가 기능 구현
* 로그인 html 디자인

<br>

***


#### 정심일

<br>

##### 12월 29일 

* 취소버튼 기능구현(누르면 피드화면으로 넘어가기)
* 사진 업로드하면 미리보기로 보여주기
* DB연결 및 테스트 

***

### 

