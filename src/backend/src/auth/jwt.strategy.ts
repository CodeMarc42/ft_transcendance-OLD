// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')
// {

//     constructor(/*private readonly authService: AuthService*/) 
//     {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: 'vwts1k+tsUuMYh1ZIGQ5eeWu/DjlHy2xlNXsBC6dzyFXRhVrC/d2R4SbhLhsbiWlJHqTEHPUA9N7l+UfGziEYixc0xqif5PHY+d7DojbebbFws/mik07eJf6MkE+SAC1jbQm2EY6C6vhIdcXbIDLwnjL3ePzyW4Itu68N4nbugPRkQO/5T0N27TDCBNQG8vDkh0609iZFU3bw5609Egu7H2XwiR6sqPv7xj1j1Qw8TipLoQ/XSuzmArgsWABQu6u6X/KKh6dTSTDWroCQNwx1Y1870uwNBZKWiBYAFhCWFdqEX6uWZyp4XZZ0lgYWXK67/4qkfgSDal7wbHihJ4lNw=='
//         });
//     }

//     async validate(payload, done: Function)
//     {
//         console.log('try validating jwt');
//         try
//         {
//             // You could add a function to the authService to verify the claims of the token:
//             // i.e. does the user still have the roles that are claimed by the token
//             //const validClaims = await this.authService.verifyTokenClaims(payload);
            
//             //if (!validClaims)
//             //    return done(new UnauthorizedException('invalid token claims'), false);
            
//             console.log('jwt validated');
//             done(null, payload);
//         }
//         catch (err)
//         {
//             console.log('jwt fail validation');
//             throw new UnauthorizedException('unauthorized', err.message);
//         }
//     }

// }


import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(){
        super({
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => {
                let data = request.cookies["crazy-pong"];
                if(!data){
                    console.log('En JWT NO COOKIE ENCONTRADA')
                    return null;
                }
                console.log('COOKIE ENCONTRADA')
                console.log(data);
                return data;
            }])
        });
    }
 
    async validate(payload, done: Function){
        if(payload === null){
            throw new UnauthorizedException();
        }
        return payload;
    }
}
