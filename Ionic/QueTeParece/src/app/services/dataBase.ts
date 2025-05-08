import {Injectable} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})

export class DatabaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isWeb: boolean = false;
  private readonly STORAGE_KEY = 'users';
  private readonly STORAGE_DB = 'usersDB';

  constructor(private platform: Platform) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.init();
  }

  async init() {
    await this.platform.ready();
    this.isWeb = Capacitor.getPlatform() === 'web';
    if (!this.isWeb) {
      try {
        const db = await this.sqlite.createConnection(
          this.STORAGE_DB, false, 'no-encryption', 1, false
        );
        await db.open();
        this.db = db;
        await db.execute(`
          CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT, apellido TEXT);
        `);
      } catch (error) {
        console.error('Error opening SQLite database', error);
      }
    }
  }

  async addUser(nombre: string, apellido: string): Promise<void> {
    if (this.db) {
      try {
        const result = await this.db.run(
          `INSERT INTO users (nombre, apellido) VALUES (?, ?)`,
          [nombre, apellido]
        );
        console.log('Usuario agregado con éxito', result);
      } catch (error) {
        console.error('Error al agregar el usuario:', error);
      }
    }
  }
}
