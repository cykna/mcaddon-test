import { world } from "@minecraft/server";
import { initializer } from "./events/initialize";

world.beforeEvents.worldInitialize.subscribe(initializer);
