import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface AccesInviteLinkParams {
  subscriberId: string
}

export async function acccessInviteLink({
  subscriberId,
}: AccesInviteLinkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
