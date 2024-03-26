import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('logout')
export class LogoutController {
    @Post()
    async logout(@Req() request: Request, @Res() response: Response): Promise<void> {
        // Clear the JWT cookie
        response.clearCookie('jwt');

        // Send a success response
        response.send({ message: 'Logged out successfully' });
    }
}