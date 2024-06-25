import { Inject, Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entities';
import { Between, Repository } from 'typeorm';

@Injectable()
export class HomeService {
    constructor(@InjectRepository(Member) private memberRepository: Repository<Member>) { }

    async getImages() {
        const readdir = util.promisify(fs.readdir);
        const readFile = util.promisify(fs.readFile);

        let imageNames = await readdir('public/images');
        const hrefs = JSON.parse(await readFile('public/images/href.json', 'utf8'));

        imageNames = imageNames.filter(name => name !== 'href.json');

        const images = imageNames.map((name, index) => ({
            src: `/images/${name}`,
            href: hrefs[index],
            alt: path.parse(name).name, // Get the file name without the extension
        }));

        return images;
    }

    async getUserByRole(role: number): Promise<any> {
        return await this.memberRepository.findOne({ where: { role: { id: role } }, relations: ['user', 'dept', 'role'] });
    }

    async getUserByDate(date: string): Promise<any> {
        switch (date) {
            case "now":
                const todayStart = new Date();
                todayStart.setHours(0, 0, 0, 0);
                
                const todayEnd = new Date();
                todayEnd.setHours(23, 59, 59, 999);
                
                const bdperson = await this.memberRepository.findOne({
                    where: {
                        dob: Between(todayStart, todayEnd),
                    },
                    order: {
                        dob: 'ASC',
                    },
                });
                
                let remaining = 0;
                if (bdperson) {
                    remaining = await this.memberRepository.count({
                        where: {
                            dob: Between(todayStart, todayEnd),
                        },
                    });
                
                    // Subtract one to exclude the first member from the count
                    remaining -= 1;
                }
                
                return { member: bdperson, count: remaining };
            case "close":
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const twoWeeksFromNow = new Date();
                twoWeeksFromNow.setDate(today.getDate() + 14);
                twoWeeksFromNow.setHours(23, 59, 59, 999);
                
                const member = await this.memberRepository.findOne({
                    where: {
                        dob: Between(today, twoWeeksFromNow),
                    },
                    order: {
                        dob: 'ASC',
                    },
                });
                
                let count = 0;
                if (member) {
                    const birthday = new Date(member.dob);
                    birthday.setFullYear(today.getFullYear());
                
                    count = await this.memberRepository.count({
                        where: {
                            dob: Between(today, twoWeeksFromNow),
                        },
                    });
                
                    // Subtract one to exclude the first member from the count
                    count -= 1;
                }
                
                return { member, count };
            default:
                return null;
        }
    }

    async getTotalbyDept(dept: any): Promise<number> {
        if (dept === "*") {
            return await this.memberRepository.count();
        } else {
            return await this.memberRepository.count({ where: { dept: { id: dept } } });
        }
    }
}
