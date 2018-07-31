import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { ParametersService } from '../parameters/parameters.service';
import { GuidGenerator, StorageAccessor, ObjectBuilder } from '../../utils';
import { DTO } from '../../models';

@Injectable()
export class DTOStorageService {

    // PS: No need for underline in the 'dtoKey' since it's the
    // highest level attribute in the application, as it must.
    private readonly _dtoKey: string = DTO.name;

    constructor(
        private _parametersService: ParametersService
    ) { }

    public initDTO(route: ActivatedRouteSnapshot): DTO {
        const dto: DTO = ObjectBuilder.buildDTOObject({});

        dto.sessionUid = GuidGenerator.generate();
        dto.analytics = this._parametersService.analytics(route);
        dto.projectConfig = this._parametersService.projectConfig(route);
        dto.crm = this._parametersService.crm(route);
        dto.bko = this._parametersService.bko(route);

        this.setDTO(dto);

        return dto;
    }

    // Getters
    public getDTO(): DTO {
        // console.log('GET DTO: ', (new Error()).stack);
        return ObjectBuilder.buildDTOObject(StorageAccessor.get(this._dtoKey));
    }

    // Setters
    public setDTO(dto: DTO): DTO {
        // console.log('SET DTO: ', (new Error()).stack);
        return ObjectBuilder.buildDTOObject(StorageAccessor.set(this._dtoKey, dto));
    }

    // Deleters
    public delDTO(): void {
        StorageAccessor.delete(this._dtoKey);
    }

}
