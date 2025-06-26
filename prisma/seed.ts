import { PrismaClient, type SpaceRole, type WorkspaceRole } from "@prisma/client";

import { cards, spaces, users, WORKSPACE_ID } from "../lib/data/sandbox";

const prisma = new PrismaClient();

const COLUMNS = [
  { id: "brief", name: "Brief", color: "#8a9891", status: "TODO" },
  { id: "in-progress", name: "In progress", color: "#4f7cf0", status: "IN_PROGRESS" },
  { id: "client-review", name: "Client review", color: "#e3a431", status: "CLIENT_REVIEW" },
  { id: "approved", name: "Approved", color: "#1fa37a", status: "DONE" },
] as const;

async function main() {
  await prisma.workspace.upsert({
    where: { id: WORKSPACE_ID },
    update: {},
    create: { id: WORKSPACE_ID, name: "Brightfold Studio", slug: "brightfold", requireMfa: true },
  });

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: { id: user.id, email: user.email, name: user.name, mfaEnabled: true },
    });
    await prisma.membership.upsert({
      where: { workspaceId_userId: { workspaceId: WORKSPACE_ID, userId: user.id } },
      update: {},
      create: {
        workspaceId: WORKSPACE_ID,
        userId: user.id,
        role: user.role.toUpperCase() as WorkspaceRole,
      },
    });
  }

  for (const space of spaces) {
    await prisma.space.upsert({
      where: { id: space.id },
      update: {},
      create: {
        id: space.id,
        name: space.name,
        color: space.color,
        workspaceId: WORKSPACE_ID,
        visibility: space.visibility === "private" ? "PRIVATE" : "STUDIO",
        members: {
          create: Object.entries(space.members).map(([userId, role]) => ({
            userId,
            role: role.toUpperCase() as SpaceRole,
          })),
        },
      },
    });
  }

  const board = await prisma.board.upsert({
    where: { id: "brd_juniper_launch" },
    update: {},
    create: {
      id: "brd_juniper_launch",
      name: "Website rebuild",
      spaceId: "spc_juniper",
      columns: {
        create: COLUMNS.map((column, position) => ({
          id: `col_${column.id}`,
          name: column.name,
          color: column.color,
          status: column.status,
          position,
        })),
      },
    },
  });

  await prisma.card.createMany({
    skipDuplicates: true,
    data: cards.map((card) => ({
      id: card.id,
      title: card.title,
      columnId: `col_${card.columnId}`,
      position: card.position,
      status: card.status.toUpperCase() as (typeof COLUMNS)[number]["status"],
      assigneeId: card.assigneeId,
      estimateHours: card.estimateHours,
    })),
  });

  console.log(
    `Seeded workspace ${WORKSPACE_ID}: ${users.length} users, ${spaces.length} spaces, board ${board.id} with ${cards.length} cards`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
