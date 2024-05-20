import { ApiProperty } from '@nestjs/swagger';
import { IErrorReturn, ISuccessReturn } from 'src/DefaultTypes/IServicesDefault';


export class SuccessReturnDto implements ISuccessReturn {
    @ApiProperty({
        example: 'success',
        description: 'Status of the response',
    })
    status?: string;

    @ApiProperty({
        example: 'Operation successful',
        description: 'Success message',
    })
    message?: string;

    @ApiProperty({
        example: 200,
        description: 'Response code',
    })
    code?: number;

    @ApiProperty({
        example: {},
        description: 'Result of the operation',
    })
    result?: any;

    @ApiProperty({
        example: {},
        description: 'Pagination details if applicable',
    })
    pagination?: any;
}


export class ErrorReturnDto implements IErrorReturn {
    @ApiProperty({
        example: 'error',
        description: 'Status of the response',
    })
    status?: string;

    @ApiProperty({
        example: 'An error occurred',
        description: 'Error message',
    })
    message?: string;

    @ApiProperty({
        example: 400,
        description: 'Error code',
    })
    code?: number;
}
