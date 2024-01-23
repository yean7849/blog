import React from 'react';
import './App.css';
import { useState } from 'react';

const App = () => {
  let [글제목, set글제목] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [따봉, set따봉] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [글제목num, set글제목num] = useState(0);
  let [입력값, set입력값] = useState('');
  let 삭제하기 = () => {
    let copy = [...글제목];
    copy.splice(글제목num, 1);
    set글제목(copy);
  };

  //자식은 X버튼을 클릭시 removeProduct함수가 실행되면서 본인의 id를 인자로 넘겨준다.
  //인자로 id를 받은 함수는 product라는 상품 전체 배열을 filter를 이용해 하나씩 뜯어내 각각의 id와 자식으로 부터 받은 인자인 id를 비교해서 해당 id를 제외한 값만을 product 배열에 넣어준다.
  //setProduct에 넣어주면 product가 최신화 되면서 product 배열안에는 삭제를 원한 상품을 제외한 상품만 존재한다.

  return (
    <div className='App'>
      <div className='black-nav'>
        <h4>블로그임</h4>
      </div>
      {글제목.map((a, i) => {
        return (
          <div className='list' key={i}>
            <h4
              onClick={() => {
                setModal((e) => !e);
                set글제목num(i);
              }}>
              {글제목[i]}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...따봉];
                  copy[i] = copy[i] + 1;
                  set따봉(copy);
                }}>
                👍{따봉[i]}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  삭제하기();
                  //상품 하나하나는 부모 컴포넌트에서 자식 컴포넌트를 map을 돌려서 데이터 배열 요소만큼 만들었다.
                  //부모에서 removeProduct라는 함수를 만든다.
                }}>
                삭제하기
              </button>
            </h4>
            <p>1월 6일 발행</p>
          </div>
        );
      })}

      <form>
        <input
          onChange={(e) => {
            set입력값(e.target.value);
          }}></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            //카피본 만들기, 카피본에 입력값 추가
            let copy = [...글제목];
            copy.unshift(입력값);
            set글제목(copy);
          }}>
          글쓰기
        </button>
      </form>

      {modal === true ? (
        <Modal
          글제목={글제목}
          글수정={() => {
            set글제목(['여자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
          }}
          글제목num={글제목num}
        />
      ) : null}
    </div>
  );
};

function Modal(props) {
  return (
    <div className='modal'>
      <h4>{props.글제목[props.글제목num]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  );
}

export default App;
