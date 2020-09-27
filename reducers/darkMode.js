export const initialState = false; // 처음 state값으로 false를 주었다. state값은 객체, 배열로도 사용할 수 있다

export const MODE_CHANGE = "MODE_CHANGE"; // count 1을 감소시킬 액션 타입이다.

export const darkModeAction = () => ({
  // 액션 생성 함수
  type: MODE_CHANGE,
});

const reducer = (state = initialState, action) => {
  // 리듀서
  return !state;
};

export default reducer;
