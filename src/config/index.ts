import dotenv from "dotenv";

dotenv.config();

const getEnv = (envKey: string) => {
    if (process.env[envKey] == undefined) {
        console.warn(`[ENV]: env variable ${envKey} missing`);
    }
    return process.env[envKey];
};

const config = {
    port: Number(getEnv("PORT")) || 4000,
    dbUrl: getEnv("DATABASE_URL") ?? "",
    jwtToken: getEnv("JWT_TOKEN") ?? ""
};

export default config;
