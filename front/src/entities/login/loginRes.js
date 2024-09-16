import commonRes from '@/entities/commonRes';

const loginRes = {};

loginRes.userLogin = (res) => {
  
  // 서버 응답 구조를 올바르게 매핑
  const requestSend = {
    ...commonRes(res),
    success: res.success,             // 성공 여부
    message: res.message,             // 서버에서 반환된 메시지
    data: {
      userToken: res.data.userToken,        // res.data 안에 있는 userToken에 접근
      refreshToken: res.data.refreshToken,  // res.data 안에 있는 refreshToken에 접근
      role: res.data.role,                  // res.data 안에 있는 role에 접근
      firstStart: res.data.firstStart,      // res.data 안에 있는 firstStart에 접근
      passwordThirdYn: res.data.passwordThirdYn // res.data 안에 있는 passwordThirdYn에 접근
    }
  };
  
  return requestSend;
};

export default loginRes;