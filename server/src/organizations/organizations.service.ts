import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const organization = await this.organizationRepository.create(
      createOrganizationDto,
    );
    return this.organizationRepository.save(organization);
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    return this.organizationRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new Error(`Organization ${id} not found`);
    }
    return this.organizationRepository.save({
      ...organization,
      ...updateOrganizationDto,
    });
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result = await this.organizationRepository.delete(id);

    if (result.affected === 0) {
      throw new Error(`Organization ${id} not found`);
    }
    return { affected: result.affected };
  }
}
