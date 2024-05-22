import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from 'src/db-connect/constants';

@Injectable()
export class ListService {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async getAll(): Promise<any> {
        const result = await this.conn.query(`
            SELECT m.*, d.name AS dept, r.name AS role
            FROM public.member m
            JOIN public.dept d ON m.dept_id = d.dept_id
            JOIN public.role r ON m.role_id = r.role_id
        `);
    
        const updatedRows = result.rows.map(row => ({
            ...row,
            rollno: row.rollno.toUpperCase(),
        }));
    
        return updatedRows;
    }

    async sortMembersBy(criteria) {
        let query = 'SELECT m.*, d.name AS dept, r.name AS role FROM public.member m JOIN public.dept d ON m.dept_id = d.dept_id JOIN public.role r ON m.role_id = r.role_id';
        let params = [];
    
        if (criteria === 'A - Z' || criteria === 'Z - A') {
            query += ' ORDER BY name ' + (criteria === 'A - Z' ? 'ASC' : 'DESC');
        } else if (criteria === 'HE' || criteria === 'HA' || criteria === 'HS' || criteria === 'ALL') {
            if (criteria !== 'ALL') {
                params.push(criteria.toLowerCase() + '%');
                query += ' WHERE rollno LIKE $' + params.length;
            }
        } else if (criteria === 'Chuyên môn' || criteria === 'Truyền thông' || criteria === 'Văn hóa' || criteria === 'Đối ngoại' || criteria === 'Nội dung' || criteria === 'ALL') {
            if (criteria !== 'ALL') {
                const shorthand = criteria.split(' ').map(word => word[0].toUpperCase()).join('');
                params.push(shorthand);
                query += (params.length > 1 ? ' AND' : ' WHERE') + ' m.dept_id = $' + params.length;
            }
        } else if (criteria === 'Chủ nhiệm' || criteria === 'Phó chủ nhiệm' || criteria === 'Trưởng ban' || criteria === 'Thành viên' || criteria === 'Cộng tác viên' || criteria === 'ALL') {
            if (criteria !== 'ALL') {
                const shorthand = criteria.split(' ').map(word => word[0].toUpperCase()).join('');
                params.push(shorthand);
                query += (params.length > 1 ? ' AND' : ' WHERE') + ' m.role_id = $' + params.length;
            }
        } else if (criteria === 'keyboard_double_arrow_up' || criteria === 'keyboard_double_arrow_down') {
            query += ' ORDER BY gen ' + (criteria === 'keyboard_double_arrow_up' ? 'ASC' : 'DESC');
        }
    
        const result = await this.conn.query(query, params);

        const updatedRows = result.rows.map(row => ({
            ...row,
            rollno: row.rollno.toUpperCase(),
        }));
        
        return updatedRows;
    }

    async searchMembers(criteria) {
        let query = 'SELECT m.*, d.name AS dept, r.name AS role FROM public.member m JOIN public.dept d ON m.dept_id = d.dept_id JOIN public.role r ON m.role_id = r.role_id WHERE m.rollno ILIKE $1 OR m.name ILIKE $1 OR m.username ILIKE $1';
        let params = ['%' + criteria + '%'];
    
        const result = await this.conn.query(query, params);
    
        const updatedRows = result.rows.map(row => ({
            ...row,
            rollno: row.rollno.toUpperCase(),
        }));
        
        console.log(updatedRows);
        console.log(criteria);
        return updatedRows;
    }

    async deleteMember(rollno: string) {
        await this.conn.query('BEGIN');
        await this.conn.query('DELETE FROM public.event_active WHERE mem_id = $1', [rollno]);
        await this.conn.query('DELETE FROM public.sem_active WHERE mem_id = $1', [rollno]);
        await this.conn.query('DELETE FROM public.member WHERE rollno = $1', [rollno]);
        await this.conn.query('COMMIT');
    }
}
