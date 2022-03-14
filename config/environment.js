

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'something_anything',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'alchemy.cn18',
            pass: 'codingninjas'
        }
    },
    google_client_id:"1077631146755-cqvee6ed279lrd9ms1ofpvj2qg9r15h0.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_sercret: 'codeial',
    
}


const production =  {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH ,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_sercret: process.env.CODEIAL_JWT_SECRET,
}



//module.exports = development;
module.exports = eval(process.env.CODEIAL_ENVIRONMENT)=='undefined' ? development : eval(process.env.CODEIAL_ENVIRONMENT);

    