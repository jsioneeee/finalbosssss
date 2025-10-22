import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface Position {
  position_id: number;
  position_code: string;
  position_name: string;
  id: string;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class PositionsService {
  constructor(private readonly db: DatabaseService) {}

  // GET all positions
  async findAll(): Promise<Position[]> {
    const query = 'SELECT * FROM positions';
    return this.db.query(query);
  }

  // GET one position by ID
  async findOne(position_id: number): Promise<Position | null> {
    const query = 'SELECT * FROM positions WHERE position_id = ?';
    const results = await this.db.query(query, [position_id]);
    return results.length > 0 ? results[0] : null;
  }

  // POST new position
  async create(data: {
    position_code: string;
    position_name: string;
  }): Promise<Partial<Position>> {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' '); // MySQL-compatible format

    const last = await this.db.query('SELECT MAX(position_id) as max FROM positions');
    const newId = last[0]?.max ? last[0].max + 1 : 1;

    const query = `
      INSERT INTO positions (position_id, position_code, position_name, id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await this.db.query(query, [
      newId,
      data.position_code,
      data.position_name,
      newId.toString(), // auto-generated string version of position_id
      now,
      now,
    ]);

    return {
      position_id: newId,
      position_code: data.position_code,
      position_name: data.position_name,
      id: newId.toString(),
    };
  }

  // PUT update position
  async update(position_id: number, updateData: {
    position_code?: string;
    position_name?: string;
  }): Promise<Position | null> {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = `
      UPDATE positions
      SET position_code = ?, position_name = ?, updated_at = ?
      WHERE position_id = ?
    `;
    await this.db.query(query, [
      updateData.position_code,
      updateData.position_name,
      now,
      position_id,
    ]);

    return this.findOne(position_id);
  }

  // DELETE position
  async remove(position_id: number): Promise<Position | null> {
    const existing = await this.findOne(position_id);
    if (!existing) return null;

    const query = 'DELETE FROM positions WHERE position_id = ?';
    await this.db.query(query, [position_id]);

    return existing;
  }
}