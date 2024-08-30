const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkIn = async (req, res) => {
  const userId = req.user.id;
  const now = new Date();

  try {
    // Periksa apakah sudah ada catatan check-in untuk hari ini
    const existingCheckIn = await prisma.attendance.findFirst({
      where: {
        employeeId: userId,
        date: {
          gte: new Date(now.setHours(0, 0, 0, 0)),
          lt: new Date(now.setHours(24, 0, 0, 0))
        }
      }
    });

    if (existingCheckIn) {
      return res.status(400).json({ error: 'You have already checked in today.' });
    }

    // Buat catatan check-in baru
    const attendance = await prisma.attendance.create({
      data: {
        employeeId: userId,
        checkIn: now,
      },
      include: {
        employee: true  // Sertakan informasi karyawan
      }
    });

    res.status(201).json({
      id: attendance.id,
      date: attendance.date,
      checkIn: attendance.checkIn,
      checkOut: attendance.checkOut,
      employeeId: attendance.employee.id,
      name: attendance.employee.name
    });
  } catch (err) {
    console.error('Error checking in:', err);
    res.status(500).json({ error: 'An error occurred while checking in.' });
  }
};

const checkOut = async (req, res) => {
  const userId = req.user.id;
  const now = new Date();

  try {
    // Cari catatan check-in untuk hari ini
    const attendance = await prisma.attendance.findFirst({
      where: {
        employeeId: userId,
        date: {
          gte: new Date(now.setHours(0, 0, 0, 0)),
          lt: new Date(now.setHours(24, 0, 0, 0))
        },
        checkIn: {
          not: null
        }
      },
      include: {
        employee: true  // Sertakan informasi karyawan
      }
    });

    if (!attendance) {
      return res.status(400).json({ error: 'You have not checked in yet.' });
    }

    // Perbarui catatan check-out
    const updatedAttendance = await prisma.attendance.update({
      where: { id: attendance.id },
      data: {
        checkOut: now,
      },
      include: {
        employee: true  // Sertakan informasi karyawan
      }
    });

    res.status(200).json({
      id: updatedAttendance.id,
      date: updatedAttendance.date,
      checkIn: updatedAttendance.checkIn,
      checkOut: updatedAttendance.checkOut,
      employeeId: updatedAttendance.employee.id,
      name: updatedAttendance.employee.name
    });
  } catch (err) {
    console.error('Error checking out:', err);
    res.status(500).json({ error: 'An error occurred while checking out.' });
  }
};

module.exports = { checkIn, checkOut };
