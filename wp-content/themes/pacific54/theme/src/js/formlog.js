const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 
const { RichText, InspectorControls } = wp.blockEditor; 
const { TextControl, PanelBody } = wp.components;

registerBlockType('pacfiftyfour/formlog', { 
 
	title: 'Pacific54 Form Log', 
	icon: 'forms',
    category: 'pacific-fiftyfour', 
    //attributes
    attributes: {
        title:{
            type: 'string',
            default: ''
        },
        linkedblock:{
            type: 'string',
            default: ''
        }

    },   

	edit({attributes, setAttributes}){
		const { title, linkedblock } = attributes;

        function onTitleChange(newtitle){
            setAttributes({title:newtitle});
        } 
        function onFormLinkChange(newtext){
            setAttributes({linkedblock:newtext});
        }

		return ([
                <InspectorControls style={{marginBottom: '20px' }}>
                <PanelBody title="Give this Block an ID">
                    <p><strong>Block ID:</strong></p>
                    <p>You can use this to link the form to the Index</p>
                    <TextControl
                        value={linkedblock}
                        onChange={onFormLinkChange}
                    />
                </PanelBody>,            
            </InspectorControls>,
            <div className="pacific-formlog" id={linkedblock}>
                <RichText 
                    tag={"h2"}
                    value={title}
                    placeholder={"Give your Log a title"}
                    onChange={ onTitleChange }
                />
                <div className="formlog-card">
                    <h2>(Example Form)</h2>
                    <div className="formlog-body"><span class="speech"><p>Hey man just wanted to hit you up with a message</p></span>
                        <span className="just-the-tip"></span>
                        <h4 class="name">🧑 Joe Commenter</h4>
                    </div>
                    <div class="formlog-footer">
                        <h5 class="phone">📱 444-444-4444</h5>
                        <h5 class="email">✉️ my@email.hi</h5>
                    </div>
                </div>
            </div>

        ]);
	},
	save({attributes}) {}
});