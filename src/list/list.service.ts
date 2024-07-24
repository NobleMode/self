import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entities';
import { Repository } from 'typeorm';

let Criteria: {
  rollno: string;
  fullname: string;
  dept: string;
  role: string;
  gen: string;
  search: string;
} = { rollno: null, fullname: null, dept: null, role: null, gen: null, search: null };

@Injectable()
export class ListService {
  constructor(@InjectRepository(Member) private memberRepository: Repository<Member>) { }

  async getAll(): Promise<any> {
    return await this.memberRepository.find({ relations: ['role', 'dept'] });
  }

  async memberSortAndSearchBy(input: string) {
    try {
      this.getCriterias(input);

      let query = this.memberRepository
        .createQueryBuilder('member')
        .leftJoinAndSelect('member.dept', 'dept')
        .leftJoinAndSelect('member.role', 'role');

      for (const key in Criteria) {
        if (Criteria[key] !== null) {
          // Perform operations using Criteria[key]
          if (key === 'fullname' || key === 'gen') {
            query = query.orderBy(`member.${key}`, Criteria[key] === 'asc' ? 'ASC' : 'DESC');
          } else if (key === 'search') {
            query = query.andWhere(`LOWER(member.fullname) like '%${Criteria[key].toLowerCase()}%'`);
          } else {
            query = query.andWhere(`member.${key} like '%${Criteria[key]}%'`);
          }
        }
      }

      const members = await query.getMany();

      return members;
    
    } catch (error) {
      console.error('An error occurred:', error);
      throw error; // re-throw the error if you want it to propagate
    }
  }

  getCriterias(input: string) {
    const type = input.split('_')[0];

    let value;

    if ( type == 'search' ) {
      value = input.split('_')[1].replace(/"/g, '');
    } else {
      value = input.split('_')[1];
    }

    switch (type) {
      case 'rollno': value != 'all' ? Criteria.rollno = value : null; break;
      case 'fullname': value != 'no' ? Criteria.fullname = value : null; break;
      case 'dept': value != 'all' ? Criteria.dept = value : null; break;
      case 'role': value != 'all' ? Criteria.role = value : null; break;
      case 'gen': value != 'no' ? Criteria.gen = value : null; break;
      case 'search': value != null ? Criteria.search = value : null; break;
    }
  }

  async deleteMember(rollno: string) {
    return await this.memberRepository
    .createQueryBuilder()
    .delete()
    .where('rollno = :rollno', { rollno })
    .execute();
  }
}
