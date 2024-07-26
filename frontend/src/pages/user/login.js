import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setUser } from "../../store/authSlice";

export default  function Login(){

    // 입력값들을 저장하기 위해 useState사용
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // 서버나 유효성검사 결과 문제가 있을 때 에러문을 넣어주기 위한 값
    const [error, setError] = useState("");
    // 리덕스 상태관리를 위해 store에 정의한 슬라이스 함수들을 가져온다
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
      
        try {
          const res = await axios.post('/api/auth/login', {email, password}, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
      
          const accessToken = res.headers['authorization'].split(' ')[1];
          console.log("Access Token:", accessToken); // 토큰이 제대로 추출되는지 확인
      
          localStorage.setItem('accessToken', accessToken);
          dispatch(setUser({ user: res.data.user, token: accessToken }));
          console.log("Dispatched setUser action"); // 디버깅용
          
          navigate('/api/mypage/info');
        } catch (e) {
          setError('Login failed. Please check your credentials.');
          console.error('Login error:', e);
        }
      }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <input 
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} />
                <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit">로그인</button>
            </form>
            {error && <p style={{color:"red"}}>{error}</p>}
        </div>
    )
}