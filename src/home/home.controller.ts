import { Controller, Render, Get} from '@nestjs/common';

@Controller('home')
export class HomeController {

    @Get()
    @Render('home.hbs')
    root() {
        return { message: 'test'};
    }
}
