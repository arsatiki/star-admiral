from __future__ import absolute_import
from django.shortcuts import get_object_or_404, render_to_response
from django.http import HttpResponsePermanentRedirect
from django.template import RequestContext

from django.contrib.auth.decorators import login_required

from .models import Game

@login_required
def setup_game(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    if not game.setup_phase():
        return HttpResponsePermanentRedirect(game.get_absolute_url())
    
    c = {'game': game}
    rctx = RequestContext(request)
    return render_to_response('games/setup.html', c, rctx)
