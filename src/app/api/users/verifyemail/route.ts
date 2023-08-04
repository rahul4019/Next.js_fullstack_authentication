import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

import User from '@/models/user';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log('token: ', token);

    /* find the user based on matching token and whose token expiry time is
     greater than current time */
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });

    console.log('user: ', user)

    user.isVerified = true
    user.verfiryToken = undefined
    user.verfiyTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
      message: 'Email verified successfully',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
