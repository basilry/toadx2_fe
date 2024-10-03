module.exports = {
    apps: [
        {
            name: "toadx2_fe", // PM2에서 관리할 애플리케이션 이름
            script: "node_modules/next/dist/bin/next",
            instances: 1, // 실행할 프로세스의 인스턴스 수
            args: "start", // npm에 전달할 인자 (npm start)
            interpreter: "node",
            env: {
                NODE_ENV: "production", // 프로덕션 모드 환경 변수
                PORT: 3000, // Next.js 서버가 사용할 포트
            },
            error_file: "./logs/err.log", // 에러 로그 파일 경로
            out_file: "./logs/out.log", // 일반 로그 파일 경로
            log_date_format: "YYYY-MM-DD HH:mm:ss", // 로그에 표시될 날짜 형식
        },
    ],
}
