import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      publicKey:"-----BEGIN PUBLIC KEY-----\n" +
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy62CMcBEXwsSQAmuy4cm\n" +
        "jjkkzrGQyy5nm3/wrNX3ssMEW9XU/qgv3h6+x+907xuRGH/G3xw/RcyOhI9x7fZq\n" +
        "SPXZKo8ccY86vpbEhIArKiISwf49miAqR4KxQlOW0upUy111zk1IbIC1Iq6IpSa0\n" +
        "oVpBOX0hpvY+KS1lp9QlleOxB4HPkJYR//5Q9IWQUpEWspzeEywiBXX53SS9qok1\n" +
        "reLeg9qU3l04o+EzWclqfdLUc+Xmbw1iMOqLGzcFxRfm5IQvxqAYbWuHHgVN/dLI\n" +
        "Ph9JTQNuxq7zPvJQWav8PMFcoqWnDGrTCQCyIvQCh9HoBDlrAnKoKyzlNDbYcT3Q\n" +
        "pwIDAQAB\n" +
        "-----END PUBLIC KEY-----",
      privateKey: "-----BEGIN PRIVATE KEY-----\n" +
        "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLrYIxwERfCxJA\n" +
        "Ca7LhyaOOSTOsZDLLmebf/Cs1feywwRb1dT+qC/eHr7H73TvG5EYf8bfHD9FzI6E\n" +
        "j3Ht9mpI9dkqjxxxjzq+lsSEgCsqIhLB/j2aICpHgrFCU5bS6lTLXXXOTUhsgLUi\n" +
        "roilJrShWkE5fSGm9j4pLWWn1CWV47EHgc+QlhH//lD0hZBSkRaynN4TLCIFdfnd\n" +
        "JL2qiTWt4t6D2pTeXTij4TNZyWp90tRz5eZvDWIw6osbNwXFF+bkhC/GoBhta4ce\n" +
        "BU390sg+H0lNA27GrvM+8lBZq/w8wVyipacMatMJALIi9AKH0egEOWsCcqgrLOU0\n" +
        "NthxPdCnAgMBAAECggEBAIWmKRR0UWj8XtFeiTBMUuRoYtqucZChtqK25TrEfHD0\n" +
        "vtt0CPvBaQebrRyM6HIt6Jvm3JxycKJgg/RAHEZFt6CAkiv3FHb/wVBmpjU71Rck\n" +
        "nKJnLg0Apj2eaKpZJ1LnKRT5EuB4ndl062cCl++m4kgubTZIAdkJI+jpPRdPggpD\n" +
        "3nrMBBr4kMTJ/WnW+v17Ce5xBSls2qLKfuWLo7j4fc++sD/ypP3Y5UdQ8PcJv+0S\n" +
        "6DDlWL/2IUNegnT8DJD6R95VrlDeqWssYHth39XTZFD0dpJ7tB+qEq8nohY7Cj7d\n" +
        "cvIXhl8JMyowEjxH39S+iEwdQednC1TOfliopa+hiSECgYEA7Mut+2vUvMTdmZP2\n" +
        "IcgH5xYZ+Ob36zD2ja+EdlVHvlrvWy/95rctrl+m3YuGLT/gf2Gt8I++PGlNcX3F\n" +
        "U2U6M/U0O/nFWyvs8FJFrDO3C9UXxOLn9FD7zbwdxTbNxi30oSksNzo3xca/au3E\n" +
        "l541VjepvLGGpOFGqCJiH1jagj0CgYEA3DI9gv/LnwP2oLu1ksGNf9keURjC9xaR\n" +
        "jpwY8vDK8EMvU/961Q77U3+NsspprXMsPCQ2C7MrO3CC/dRpF2zl3IGmaK1GNjt7\n" +
        "tbqQ9zQ30jIpmDtsO3UpsPH+U2G/g9bkP17Wj88PDyTBvW5SIm0Jz8PoiMjtbN7t\n" +
        "GfPPcllTwLMCgYBtfy3fohhIhfw2xS2+p0HIQPcXmq4vqn+IOw5UrdC0HFasYv/U\n" +
        "jQXpqT9/GMKd7/i+zothPwbn5oWyIkd57chBOHTD+xagtyokYtbm7y8IoKwSFh7O\n" +
        "YhheJUva4yG6L4v8bg6NJzWdFe9z4ajTt4vQZ4Lsx2aMncNPgj6/YhYAvQKBgGLT\n" +
        "0bPH5rXZ64k8dkQFxuJIqkivmmGXqYCeIrx2wj6PiOBkW9bgQIC7UPebzU5h0Mq1\n" +
        "XeRmZ9LnroMKIJi48XnEXtHAYzDYBbAMqh+pOhyHExAWK3+MGEgodIMr7e7YNd0T\n" +
        "Ta2BuzqKvsGskASPd8XeIbGyrI0eiMALI2IpIWPtAoGBAMNM8NF9k+1V/92IA8P5\n" +
        "m0BBGx41aWkV2g9TyVinQmhiAPRJ9s6CRFWHdhKCOKiUNH0wP7vNvwWrK5CxtLbB\n" +
        "guKZzhm58mMOxp2pmOjjp+v5CyWGGkqqfE9beKQ/iRb1+ZQxzGHTL969NMTit/aO\n" +
        "OQDMV6xlzAhMddJRiAvh0/Bb\n" +
        "-----END PRIVATE KEY-----",
      signOptions: {
        expiresIn: '24h',
        algorithm: 'RS256',
      }
    })
  ]
})
export class AuthModule {}
