import React from 'react';

import Link from 'next/link';

import { Card, Grid } from '@material-ui/core';

import consts from '../../consts.json';
import AbstractList from '../../components/common/listPage.tsx';
import D4DJCardIcon from '../../components/cards/icon.jsx'
//import l10n from '../../utils/l10n/l10n';

//const strings = new l10n();

class DjCardsListPage extends AbstractList {
    constructor(props) {
        super(props)
        this.databases = ['CardMaster', 'CharacterMaster']
        this.title = "CARDS_TITLE";
        this.sortDefaultKey = "StartDate";
        this.sortAvailableKeys = ['Id', 'StartDate', 'Rarity', "Character"]
        this.availableFilters = {
            "Rarity": [1, 2, 3, 4],
            "Attribute": [1, 2, 3, 4, 5],
            "Character": [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44, 51, 52, 53, 54, 61, 62, 63, 64]
        }
    }

    getIllustUrl(card, illustMode = 0) {
        return consts.cdn + "ondemand/card_icon/card_icon_0" + card.Id + "_" + illustMode + ".jpg"
    }

    renderElements() {
        let cards = this.state.databases.CardMaster;
        let charas = this.state.databases.CharacterMaster;
        
        let out = []

        for (let card in cards) {
            card = cards[card]

            if (card.CardName === "※危険トランプ追加用")
                continue;

            out.push(<Link href={"/cards/" + card.Id}>
                <Card className={this.classes.card}>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item>
                            {/* <img src={this.getIllustUrl(card)} alt={card.Id} className={this.classes.cardIcon} /> */}
                            <D4DJCardIcon illustUrl={this.getIllustUrl(card)} rarity={card.Rarity} typeId={card.Attribute}/>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={4} sm={6} md={8}>
                            <div style={{textAlign: "left"}}>
                                <b>{this.isJp ? charas[card.Character].FullName : charas[card.Character].FullNameEnglish}</b>
                                <p>{card.CardName}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Link>)
        }

        return out
    }
}

export default DjCardsListPage;