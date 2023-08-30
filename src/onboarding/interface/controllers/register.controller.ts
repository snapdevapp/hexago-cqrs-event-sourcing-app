import { Controller, Get } from '@nestjs/common';

@Controller()
export default class RegisterController {
  @Get()
  register() {
    return 'hello world';
  }
}
