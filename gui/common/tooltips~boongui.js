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
};

function winLossPointsELO(rating, opponent_rating, games_played)
{
// keep it in sync with elo.py
var RESULT_WIN = 1;
var RESULT_LOSS = -1;
var ELO_SURE_WIN_DIFFERENCE = 600;
var ELO_K_FACTOR_CONSTANT_RATING = 2200;
var VOLATILITY_CONSTANT = 20;
var ANTI_INFLATION = 0.015;

// Player ratings are -1 unless they have played a rated game.
if (rating == -1) 
return rating = g_DefaultLobbyRating;
if (opponent_rating == -1)
return opponent_rating = g_DefaultLobbyRating;
            
let rating_k_factor = 50.0 * (Math.min(rating, ELO_K_FACTOR_CONSTANT_RATING) / ELO_K_FACTOR_CONSTANT_RATING + 1.0) / 2.0;
let player_volatility = (Math.min(Math.max(0, (games_played || 0)+1), VOLATILITY_CONSTANT) / VOLATILITY_CONSTANT + 0.25) / 1.25;
let volatility = rating_k_factor * player_volatility;
let rating_difference = opponent_rating - rating;
let rating_adjustment_win = (rating_difference + RESULT_WIN * ELO_SURE_WIN_DIFFERENCE) / volatility - ANTI_INFLATION;
let rating_adjustment_lost = (rating_difference + RESULT_LOSS * ELO_SURE_WIN_DIFFERENCE) / volatility - ANTI_INFLATION;

let points_you_gain = (Math.round(Math.max(0.0, rating_adjustment_win)));
let points_you_lose = (Math.round(Math.min(0.0, rating_adjustment_lost)));
let new_rating_win = rating + points_you_gain;
let new_rating_lose = rating + points_you_lose;

return sprintf("1v1: %(gain)s / %(lose)s", {
		"gain": coloredText(points_you_gain + " (" + new_rating_win + ")", "green"),
		"lose": coloredText(points_you_lose + " (" + new_rating_lose + ")", "red")
		})
}


