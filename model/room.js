export class Room {
  constructor(
    currentLocation,
    destinationLocation,
    roomId,
    ownerId,
    owner,
    topic,
    maxCount,
    participants,
    time,
    description,
    created_at,
    updatedAt,
  ) {
    this.currentLocation = currentLocation;
    this.destinationLocation = destinationLocation;
    this._id = roomId;
    this.roomId = roomId;
    this.ownerId = ownerId;
    this.owner = owner;
    this.topic = topic;
    this.maxCount = maxCount;
    this.participants = participants;
    this.time = time;
    this.description = description;
    this.created_at = created_at;
    this.updatedAt = updatedAt;
  }
}
