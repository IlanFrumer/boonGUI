//keep this in sync with Player~boongui.js
// used in Gamesetup to have the same colors as in the game
var g_vividColorsGamesetup = {
	"vividBlue": { "r": 0, "g": 160, "b": 255 },
	"vividRed": { "r": 255, "g": 0, "b": 0 },
	"vividGreen": { "r": 0, "g": 255, "b": 0 },
	"vividYellow": { "r": 255, "g": 255, "b": 0 },
	"vividCyan": { "r": 0, "g": 255, "b": 255 },
	"vividPurple": { "r": 157, "g": 97, "b": 255 },
	"vividOrange": { "r": 255, "g": 153, "b": 0 },
	"vividPink": { "r": 255, "g": 50, "b": 255 }
};

// It compares the old color with the  g_vividColorsGamesetup colors
function makeColorsVivid(oldColor) {
  if (oldColor == g_Settings.PlayerDefaults[1].Color)
      return g_vividColorsGamesetup.vividBlue;
  if (oldColor == g_Settings.PlayerDefaults[2].Color)
      return g_vividColorsGamesetup.vividRed;
  if (oldColor == g_Settings.PlayerDefaults[3].Color)
      return g_vividColorsGamesetup.vividGreen;
  if (oldColor == g_Settings.PlayerDefaults[4].Color)
      return g_vividColorsGamesetup.vividYellow;
  if (oldColor == g_Settings.PlayerDefaults[5].Color)
      return g_vividColorsGamesetup.vividCyan;
  if (oldColor == g_Settings.PlayerDefaults[6].Color)
      return g_vividColorsGamesetup.vividPurple;
  if (oldColor == g_Settings.PlayerDefaults[7].Color)
      return g_vividColorsGamesetup.vividOrange;
  if (oldColor == g_Settings.PlayerDefaults[8].Color)
      return g_vividColorsGamesetup.vividPink;
  else 
  return oldColor;
}

// currently being used in the StatsOverlay for limiting the K/D value and in the HUD for limiting the attack/ speed numbers
function limitNumber(num)
{
        if (num < 10) {
            return Number(num.toFixed(1))
        }
        if (num >= 10) {
            return Math.round(num)
        }
}

function setupStatHUDAttackTooltip(template, projectiles)
{
	let tooltips = [];
	for (let attackType in template.attack)
	{
		// Slaughter is used to kill animals, so do not show it.
		// Capture is not needed here.
		if (["Slaughter", "Capture"].some((s) => attackType.includes(s)))
		    continue;

		let attackTypeTemplate = template.attack[attackType];
		let attackLabel = sprintf(headerFont(translate("%(attackType)s")), {
			"attackType": translateWithContext(attackTypeTemplate.attackName.context || "Name of an attack, usually the weapon.", attackTypeTemplate.attackName.name)
		});

		let splashTemplate = attackTypeTemplate.splash;

		// Show the effects of status effects below.
		let statusEffectsDetails = [];
		if (attackTypeTemplate.ApplyStatus)
			for (let status in attackTypeTemplate.ApplyStatus)
				statusEffectsDetails.push("\n" + g_Indent + g_Indent + getStatusEffectsTooltip(status, attackTypeTemplate.ApplyStatus[status], true));
		statusEffectsDetails = statusEffectsDetails.join("");

		tooltips.push(sprintf(translate("%(attackLabel)s: %(effects)s, %(rate)s%(statusEffects)s%(splash)s"), {
			"attackLabel": attackLabel,
			"effects": attackEffectsDetails(attackTypeTemplate),
			"rate": attackRateDetails(attackTypeTemplate.repeatTime, projectiles),
			"splash": splashTemplate ? "\n" + g_Indent + g_Indent + splashDetails(splashTemplate) : "",
			"statusEffects": statusEffectsDetails
		}));
	}

	return sprintf(translate("%(label)s\n%(details)s"), {
		"label": headerFont(translate("Attack per Second\nDetails:")),
		"details": g_Indent + tooltips.join("\n" + g_Indent)
	});
}

function setupStatHUDHackResistanceTooltip(template)
{
	return sprintf(translate("%(label)s %(resistance)s %(explaination)s"), {
		"label": headerFont(translate("Hack Resistance Level\nDetails:\n"+g_Indent)),
		"resistance": resistanceLevelToPercentageString(template.resistance.Damage["Hack"]),
		"explaination": unitFont(translate("Resistance against Hack Attacks"))
	});
}

function setupStatHUDPierceResistanceTooltip(template)
{
	return sprintf(translate("%(label)s %(resistance)s %(explaination)s"), {
		"label": headerFont(translate("Pierce Resistance Level\nDetails:\n"+g_Indent)),
		"resistance": resistanceLevelToPercentageString(template.resistance.Damage["Pierce"]),
		"explaination": unitFont(translate("Resistance against Pierce Attacks"))
	});
}

function setupStatHUDCrushResistanceTooltip(template)
{
	return sprintf(translate("%(label)s %(resistance)s %(explaination)s"), {
		"label": headerFont(translate("Crush Resistance Level\nDetails:\n"+g_Indent)),
		"resistance": resistanceLevelToPercentageString(template.resistance.Damage["Crush"]),
		"explaination": unitFont(translate("Resistance against Crush Attacks"))
	});
}

function setupStatHUDSpeedTooltip(template)
{
	const walk = template.speed.walk.toFixed(1);
	const run = template.speed.run.toFixed(1);

	if (walk == 0 && run == 0)
		return "";

	return sprintf(translate("%(label)s %(speeds)s"), {
		"label": headerFont(translate("Walk Speed\nDetails:\n"+g_Indent)),
		"speeds":
			sprintf(translate("%(speed)s %(movementType)s"), {
				"speed": walk,
				"movementType": unitFont(translate("Walk"))
			}) +
			commaFont(translate(", ")) +
			sprintf(translate("%(speed)s %(movementType)s"), {
				"speed": run,
				"movementType": unitFont(translate("Run"))
			})
	});
}
