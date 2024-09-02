const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkIn = async (req, res) => {
  const userId = req.user.id;
  const now = new Date();

  try {
    //Check if there is already a check-in record for today.
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

    // Create a new check-in record.
    const attendance = await prisma.attendance.create({
      data: {
        employeeId: userId,
        checkIn: now,
      },
      include: {
        employee: true  // Include employee information
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
    // Search for today's check-in record
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
        employee: true  // Include employee information
      }
    });

    if (!attendance) {
      return res.status(400).json({ error: 'You have not checked in yet.' });
    }

    // Update the check-out record.
    const updatedAttendance = await prisma.attendance.update({
      where: { id: attendance.id },
      data: {
        checkOut: now,
      },
      include: {
        employee: true  // Include employee information
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
