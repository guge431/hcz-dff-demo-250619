// manual-setup.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTablesAndData() {
  try {
    console.log('🔧 手动创建表和数据...')

    // 1. 创建 people 表
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS people (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    console.log('✅ people 表创建成功')

    // 2. 创建 hobbies 表
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS hobbies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        person_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_person FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE
      )
    `)
    console.log('✅ hobbies 表创建成功')

    // 3. 清空现有数据（如果有的话）
    await prisma.$executeRawUnsafe(`DELETE FROM hobbies`)
    await prisma.$executeRawUnsafe(`DELETE FROM people`)
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE people_id_seq RESTART WITH 1`)
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE hobbies_id_seq RESTART WITH 1`)

    // 4. 插入人员数据
    await prisma.$executeRawUnsafe(`
      INSERT INTO people (name, age) VALUES 
      ('张三', 25),
      ('李四', 30),
      ('王五', 28),
      ('赵六', 35),
      ('孙七', 22)
    `)
    console.log('✅ 人员数据插入成功')

    // 5. 插入爱好数据
    await prisma.$executeRawUnsafe(`
      INSERT INTO hobbies (name, person_id) VALUES 
      ('读书', 1),
      ('游泳', 1),
      ('编程', 1),
      ('篮球', 2),
      ('音乐', 2),
      ('旅行', 3),
      ('摄影', 3),
      ('烹饪', 3),
      ('跑步', 4),
      ('绘画', 4),
      ('吉他', 5),
      ('电影', 5)
    `)
    console.log('✅ 爱好数据插入成功')

    // 6. 查看创建的数据
    const people = await prisma.$queryRawUnsafe(`
      SELECT p.*, 
             COUNT(h.id) as hobby_count
      FROM people p 
      LEFT JOIN hobbies h ON p.id = h.person_id 
      GROUP BY p.id, p.name, p.age, p.created_at, p.updated_at
      ORDER BY p.id
    `)

    const hobbies = await prisma.$queryRawUnsafe(`
      SELECT h.*, p.name as person_name 
      FROM hobbies h 
      JOIN people p ON h.person_id = p.id 
      ORDER BY h.person_id, h.id
    `)

    console.log('\n📊 创建的数据统计:')
    console.log('👥 人员列表:')
    console.table(people)
    
    console.log('\n🎯 爱好列表:')
    console.table(hobbies)

    // 7. 验证表结构
    const tableInfo = await prisma.$queryRawUnsafe(`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name IN ('people', 'hobbies') 
      ORDER BY table_name, ordinal_position
    `)
    
    console.log('\n🏗️ 表结构:')
    console.table(tableInfo)

  } catch (error) {
    console.error('❌ 创建失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTablesAndData()