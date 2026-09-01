import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

interface jwtPayload {
    sub: number,
    role: "customer" | "admin"
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "secretjustfortestingthenwegonnachangethattoanother"
        })
    }

    async validate(payload: jwtPayload) {
        return {userId : payload.sub, role: payload.role}
    }
}