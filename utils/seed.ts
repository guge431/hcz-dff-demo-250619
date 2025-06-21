import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 开始种子数据...')

  // 创建人员和爱好
  const person1 = await prisma.person.create({
    data: {
      name: '张三',
      age: 25,
      hobbies: {
        create: [
          { name: '读书' },
          { name: '游泳' },
          { name: '编程' }
        ]
      }
    },
    include: {
      hobbies: true
    }
  })

  const person2 = await prisma.person.create({
    data: {
      name: '李四',
      age: 30,
      hobbies: {
        create: [
          { name: '篮球' },
          { name: '音乐' }
        ]
      }
    },
    include: {
      hobbies: true
    }
  })

  const person3 = await prisma.person.create({
    data: {
      name: '王五',
      age: 28,
      hobbies: {
        create: [
          { name: '旅行' },
          { name: '摄影' },
          { name: '烹饪' },
          { name: '读书' } // 与张三有相同爱好
        ]
      }
    },
    include: {
      hobbies: true
    }
  })

  console.log('✅ 创建的数据:')
  console.log('person1:', person1)
  console.log('person2:', person2)
  console.log('person3:', person3)

  // 统计数据
  const personCount = await prisma.person.count()
  const hobbyCount = await prisma.hobby.count()

  console.log(`📊 总计: ${personCount} 个人, ${hobbyCount} 个爱好`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })