const loginReq = {}

loginReq.userLogin = (params) => {

  const requestSend = {
    emailId: params.emailId,
    emailPw: params.emailPw
  }
  return requestSend
}

export default loginReq
