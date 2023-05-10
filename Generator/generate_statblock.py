# Import the openai library
import openai
openai.api_key = "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"

# Define a function to generate the stat block
def generate_statblock(monster_name):
    # Define the prompt for the GPT-3 API
    prompt = f"Generate a 5th edition stat block for the D&D monster {monster_name}. The statblock should follow this format:\n"
    format = '''
    {Name}
    {Size} {Type}, {Alignment}
    ________________________________________
    Armor Class {AC} ({Armor Type})
    Hit Points {HP} ({Hit Dice})
    Speed {Speed}
    ________________________________________
    STR  {Str} ({Str Modifier})
    DEX  {Dex} ({Dex Modifier})
    CON  {Con} ({Con Modifier})
    INT  {Int} ({Int Modifier})
    WIS  {Wis} ({Wis Modifier})
    CHA  {Cha} ({Cha Modifier})
    ________________________________________
    Saving Throws {Stat1} +{Modifier1}, {Stat2} +{Modifier2} (if any)
    Skills {Skill1} +{Modifier1}, {Skill2} +{Modifier2} (if any)
    Senses {Sense1} (if any), passive Perception {Score}
    Languages {Languages}
    Challenge {CR} ({XP} XP)
    ________________________________________
    Traits
    {Trait1}: {Description}
    {Trait2}: {Description} (if any)

    Actions
    {Action1}: {Description}
    {Action2}: {Description} (if any)

    Reactions (if any)
    {{Reaction1}}: {{Description}}
    {{Reaction2}}: {{Description}} (if any)

    Legendary Actions (if any)
    {Name} can take {Number} legendary actions, choosing from the options below. Only one legendary action can be used at a time, and only at the end of another creature's turn. {Name} regains spent legendary actions at the start of its turn.

    {Legendary Action1}: {Description}
    {Legendary Action2}: {Description} (if any)
    '''

    # Call the GPT-3 API
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt + format,
        temperature=0.7,
        max_tokens=1000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    # Parse the response to extract the stat block
    stat_block = response.choices[0].text.strip()

    return stat_block