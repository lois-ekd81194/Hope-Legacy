
import math
import time
from copy import deepcopy

import Azul.azul_utils as utils
from Azul.azul_model import AzulGameRule
from template import Agent
import random


NUM_PLAYERS = 2
THINKTIME = 0.8



class myAgent(Agent):
    def __init__(self, _id):
        super().__init__(_id)
        self.game_rule = AzulGameRule(2)
        self.player_id = self.id
        self.opponent_id = (self.id + 1) % NUM_PLAYERS

    def SelectAction(self, actions, game_state):
        start_time = time.time()
        game_state_copy = deepcopy(game_state)

        actions = self.GetFilteredActions(game_state_copy, self.id)
        best_action = actions[0]
        best_action_value = -math.inf

        max_depth = 4

        # Use minimax with iterative deepening logic to find the best action
        for depth in range(2, max_depth + 1):
            for action in actions:
                current_state = deepcopy(game_state_copy)
                action_value = self.minimax(current_state, action, depth - 1, -math.inf, math.inf, True)
                if action_value > best_action_value:
                    best_action_value = action_value
                    best_action = action

                if time.time() - start_time > THINKTIME:
                    break

            if time.time() - start_time > THINKTIME:
                break

        return best_action

    def minimax(self, state, action, depth, alpha, beta, is_maximising):
        # Base case
        if depth == 0:
            return self.evaluation_score(state)

        if is_maximising:
            state_copy = deepcopy(state)
            next_state = self.game_rule.generateSuccessor(state_copy, action, self.player_id)

            next_actions = self.GetFilteredActions(next_state, self.opponent_id)
            best_score = -math.inf
            for next_action in next_actions:

                next_state_copy = deepcopy(next_state)
                if next_action == "ENDROUND":
                    return self.evaluation_score(next_state_copy)
                if next_action == "STARTROUND":
                    continue
                score = self.minimax(next_state_copy, next_action, depth - 1, alpha, beta, False)
                best_score = max(best_score, score)
                alpha = max(alpha, best_score)
                if beta <= alpha:
                    break
            return best_score

        else:
            state_copy = deepcopy(state)
            next_state = self.game_rule.generateSuccessor(state_copy, action, self.opponent_id)
            next_actions = self.GetFilteredActions(next_state, self.player_id)
            best_score = math.inf
            for next_action in next_actions:
                next_state_copy = deepcopy(next_state)
                if next_action == "ENDROUND":
                    return self.evaluation_score(next_state_copy)
                if next_action == "STARTROUND":
                    continue
                score = self.minimax(next_state_copy, next_action, depth - 1, alpha, beta, True)
                best_score = min(best_score, score)
                beta = min(beta, best_score)
                if beta >= alpha:
                    break
            return best_score

    def evaluation_score(self, state):
        # Score is equal to the difference between the player's score and the opponent's score
        state_copy = deepcopy(state)

        state_copy.ExecuteEndOfRound()
        player_state_copy = deepcopy(state_copy.agents[self.player_id])
        opponent_state_copy = deepcopy(state_copy.agents[self.opponent_id])

        player_score = player_state_copy.score
        opponent_score = opponent_state_copy.score

        bonus_score_player = self.bonus_score(player_state_copy)
        bonus_score_opponent = self.bonus_score(opponent_state_copy)

        return player_score + bonus_score_player - (opponent_score + bonus_score_opponent)

    def bonus_score(self, player_state):
        player_grid = player_state.grid_state
        player_scheme = player_state.grid_scheme

        row_bonus = 0 

        col_bonus = 0
        set_bonus = 0

        # Calculate row bonus

        for row in range(5):
            if all(player_grid[row][col] == 1 for col in range(5)):
                row_bonus += 0

        # Calculate column bonus
        for col in range(5):
            if all(player_grid[row][col] == 1 for row in range(5)):
                col_bonus += 7

            # Calculate color bonus
            for color in range(5):
                all_colors = []
                for i in range(5):
                    for j in range(5):
                        if player_scheme[i][j] == color:
                            all_colors.append((i, j))

                is_full = True
                for (x, y) in all_colors:
                    if player_grid[x][y] != 1:
                        is_full = False
                if is_full:
                    set_bonus += 0


        total_bonus = row_bonus + col_bonus + set_bonus
        return total_bonus


    def GetFilteredActions(self, game_state, id):
        state = deepcopy(game_state)
        legal_actions = self.game_rule.getLegalActions(state, id)
        start_and_end_round = []
        pattern_line_actions = []
        # no_floor_line_actions = []
        # return actions that are not placing every tiles on the floor line when possible

        # player_score = player_state_copy.score
        for action in legal_actions:

            if action == "STARTROUND" or action == "ENDROUND":
                start_and_end_round.append(action)
                continue

            tg = action[2]

            if tg.num_to_pattern_line > 0:
                pattern_line_actions.append(action)

                # not used at the moment

                # if tg.num_to_floor_line == 0:
                #     no_floor_line_actions.append(action)

        # if len(no_floor_line_actions) > 0:
        #     for action in start_and_end_round:
        #         no_floor_line_actions.append(action)
        #     return no_floor_line_actions

        if len(pattern_line_actions) > 0:
            for action in start_and_end_round:
                pattern_line_actions.append(action)
            return self.sort_actions(pattern_line_actions, state, id)

        return self.sort_actions(legal_actions, state, id)

    def sort_actions(self, actions, state, id):
        actions_for_sort = []
        for action in actions:
            state_copy = deepcopy(state)
            next = self.game_rule.generateSuccessor(state_copy, action, id)
            next_state = deepcopy(next)
            next_state.ExecuteEndOfRound()
            player_state_copy = deepcopy(next_state.agents[id])
            score = player_state_copy.score
            # bonus_score = self.bonus_score(player_state_copy) * 0.5
            # score += bonus_score
            action_for_sort = (score, action)
            actions_for_sort.append(action_for_sort)
        # sort actions by score
        actions_for_sort.sort(key=lambda x: x[0], reverse=True)
        # print(actions_for_sort)
        sorted_actions = []
        for action in actions_for_sort:
            sorted_actions.append(action[1])

        return sorted_actions



