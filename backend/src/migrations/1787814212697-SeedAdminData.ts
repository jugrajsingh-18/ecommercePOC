import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedAdminData1787814212697 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Hash for password 'Blob@12345'
        const hashedPassword = "$2b$10$aPV5HyouJmTzL5lUva1R..Kyky2ckjpQYOxRwHD48GfDAqKJ11U1m";

        await queryRunner.query(
            `INSERT INTO users (id, username, email, password, role) 
             VALUES (gen_random_uuid(), 'Admin', 'clothadmin@gmail.com', $1, 'Admin') 
             ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, role = 'Admin'`,
            [hashedPassword]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users WHERE email = 'clothadmin@gmail.com'`);
    }

}
