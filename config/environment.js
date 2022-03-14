

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
    name: 'production'
}



module.exports = development;