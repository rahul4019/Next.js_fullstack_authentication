import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/user';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;

    /* find the user based on matching token and whose token expiry time is
     greater than current time */
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });

    // encrypt the user sent password then update it in db
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({
      message: 'Password reseted successfully',
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
