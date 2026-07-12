import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  const dbUsers = await prisma.user.count();
  if (dbUsers > 0) {
    console.log('Database already contains data. Skipping seed.');
    return;
  }

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create University
  const university = await prisma.university.create({
    data: {
      name: 'SRM Institute of Science and Technology',
      domain: 'srmist.edu.in'
    }
  });

  // Create Student
  const student = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'student@srmist.edu.in',
      password: hashedPassword,
      role: 'STUDENT',
      universityId: university.id
    }
  });

  // Create Club Admin
  const admin = await prisma.user.create({
    data: {
      name: 'Alice Tech',
      email: 'admin@techclub.srmist.edu.in',
      password: hashedPassword,
      role: 'CLUB_ADMIN',
      universityId: university.id
    }
  });

  // Create Club
  const club = await prisma.club.create({
    data: {
      name: 'SRM Tech Club',
      description: 'The official technology club of SRM IST.',
      adminId: admin.id,
      universityId: university.id,
      logoUrl: 'https://via.placeholder.com/150'
    }
  });

  // Create Events
  await prisma.event.create({
    data: {
      title: 'Hackathon 2026',
      description: 'Annual 24-hour hackathon. Build amazing projects and win prizes!',
      clubId: club.id,
      category: 'Tech',
      date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      venue: 'Tech Park Auditorium',
      isPublished: true,
      posterUrl: 'https://via.placeholder.com/800x400',
      analytics: { create: {} }
    }
  });

  await prisma.event.create({
    data: {
      title: 'Web Dev Workshop',
      description: 'Learn modern web development with React and Node.js.',
      clubId: club.id,
      category: 'Workshop',
      date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      venue: 'Lab 402',
      isPublished: true,
      posterUrl: 'https://via.placeholder.com/800x400',
      analytics: { create: {} }
    }
  });

  console.log('Seeding complete!');
  console.log('Student credentials: student@srmist.edu.in / password123');
  console.log('Admin credentials: admin@techclub.srmist.edu.in / password123');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
